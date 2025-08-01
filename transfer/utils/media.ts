import { supabase } from './supabase';
import type { Media, MediaInsert } from './supabase';

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadResult {
  success: boolean;
  media?: Media;
  error?: string;
}

/**
 * Upload a file to Supabase Storage and create a database record
 */
export async function uploadMedia(
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> {
  try {
    // Validate file first
    const validation = await validateFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    // Generate unique filename using sanitized name
    const sanitizedName = validation.sanitizedName || file.name;
    const fileExt = sanitizedName.split('.').pop();
    const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('media')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      return { success: false, error: uploadError.message };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(fileName);

    // Get image dimensions if it's an image
    let width: number | null = null;
    let height: number | null = null;
    
    if (file.type.startsWith('image/')) {
      try {
        const dimensions = await getImageDimensions(file);
        width = dimensions.width;
        height = dimensions.height;
      } catch (error) {
        console.warn('Could not get image dimensions:', error);
      }
    }

    // Create database record
    const mediaData: MediaInsert = {
      filename: fileName.split('/').pop() || fileName,
      original_filename: validation.sanitizedName || file.name,
      file_path: publicUrl,
      file_size: file.size,
      mime_type: file.type,
      width,
      height,
      uploaded_by: user.id
    };

    const { data: media, error: dbError } = await supabase
      .from('media')
      .insert(mediaData)
      .select()
      .single();

    if (dbError) {
      // Clean up uploaded file if database insert fails
      await supabase.storage.from('media').remove([fileName]);
      return { success: false, error: dbError.message };
    }

    return { success: true, media };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a media file from both storage and database
 */
export async function deleteMedia(mediaId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Get media record
    const { data: media, error: fetchError } = await supabase
      .from('media')
      .select('*')
      .eq('id', mediaId)
      .single();

    if (fetchError || !media) {
      return { success: false, error: 'Media not found' };
    }

    // Extract file path from URL
    const url = new URL(media.file_path);
    const filePath = url.pathname.split('/storage/v1/object/public/media/')[1];

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('media')
      .remove([filePath]);

    if (storageError) {
      console.warn('Storage deletion failed:', storageError);
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('media')
      .delete()
      .eq('id', mediaId);

    if (dbError) {
      return { success: false, error: dbError.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update media metadata
 */
export async function updateMedia(
  mediaId: string,
  updates: { alt_text?: string; caption?: string; filename?: string }
): Promise<{ success: boolean; media?: Media; error?: string }> {
  try {
    const { data: media, error } = await supabase
      .from('media')
      .update(updates)
      .eq('id', mediaId)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, media };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get all media files with optional filtering
 */
export async function getMediaFiles(options?: {
  search?: string;
  mimeType?: string;
  limit?: number;
  offset?: number;
}): Promise<{ success: boolean; media?: Media[]; error?: string }> {
  try {
    let query = supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });

    if (options?.search) {
      query = query.or(`filename.ilike.%${options.search}%,original_filename.ilike.%${options.search}%`);
    }

    if (options?.mimeType) {
      query = query.like('mime_type', `${options.mimeType}%`);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
    }

    const { data: media, error } = await query;

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, media: media || [] };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get image dimensions from a file
 */
function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Format file size in human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get file type category from MIME type
 */
export function getFileType(mimeType: string): 'image' | 'document' | 'video' | 'audio' | 'other' {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.includes('pdf') || mimeType.includes('doc') || mimeType.includes('text')) return 'document';
  return 'other';
}

/**
 * Sanitize filename to prevent path traversal and other attacks
 */
function sanitizeFilename(filename: string): string {
  // Remove path separators and dangerous characters
  return filename
    .replace(/[\\\/:*?"<>|]/g, '_')
    .replace(/\.\.+/g, '_')
    .replace(/^\.|\.$/, '_')
    .substring(0, 255); // Limit length
}

/**
 * Validate file extension matches MIME type
 */
function validateFileExtension(filename: string, mimeType: string): boolean {
  const ext = filename.toLowerCase().split('.').pop();
  const mimeToExt: Record<string, string[]> = {
    'image/jpeg': ['jpg', 'jpeg'],
    'image/png': ['png'],
    'image/gif': ['gif'],
    'image/webp': ['webp'],
    'image/svg+xml': ['svg'],
    'application/pdf': ['pdf'],
    'text/plain': ['txt'],
    'application/msword': ['doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx']
  };
  
  const allowedExts = mimeToExt[mimeType];
  return allowedExts ? allowedExts.includes(ext || '') : false;
}

/**
 * Check for malicious file signatures
 */
function checkFileSignature(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      if (!buffer) {
        resolve(false);
        return;
      }
      
      const bytes = new Uint8Array(buffer.slice(0, 16));
      const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
      
      // Check for malicious signatures
      const maliciousSignatures = [
        '4d5a', // PE executable
        '7f454c46', // ELF executable
        'cafebabe', // Java class file
        'feedface', // Mach-O binary
        'cefaedfe', // Mach-O binary
        '504b0304', // ZIP (could contain malicious files)
        '526172211a07', // RAR archive
      ];
      
      const isMalicious = maliciousSignatures.some(sig => hex.startsWith(sig));
      resolve(!isMalicious);
    };
    reader.onerror = () => resolve(false);
    reader.readAsArrayBuffer(file.slice(0, 16));
  });
}

/**
 * Comprehensive file validation with security checks
 */
export async function validateFile(file: File): Promise<{ valid: boolean; error?: string; sanitizedName?: string }> {
  // Check file size (max 5MB for better security)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 5MB' };
  }
  
  // Check minimum file size (prevent empty files)
  if (file.size < 1) {
    return { valid: false, error: 'File cannot be empty' };
  }

  // Sanitize filename
  const sanitizedName = sanitizeFilename(file.name);
  if (!sanitizedName || sanitizedName.length < 1) {
    return { valid: false, error: 'Invalid filename' };
  }

  // Strict MIME type validation
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain'
  ];

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File type not supported. Only JPEG, PNG, GIF, WebP, PDF, and TXT files are allowed.' };
  }
  
  // Validate file extension matches MIME type
  if (!validateFileExtension(file.name, file.type)) {
    return { valid: false, error: 'File extension does not match file type' };
  }

  // Check file signature for malicious content
  const isSignatureValid = await checkFileSignature(file);
  if (!isSignatureValid) {
    return { valid: false, error: 'File appears to contain malicious content' };
  }
  
  // Additional validation for images
  if (file.type.startsWith('image/')) {
    try {
      // Verify it's actually an image by trying to load it
      await getImageDimensions(file);
    } catch (error) {
      return { valid: false, error: 'Invalid image file' };
    }
  }

  return { valid: true, sanitizedName };
}