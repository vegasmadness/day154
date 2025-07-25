export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          website: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          content: string
          hero_image: string | null
          published_at: string | null
          is_draft: boolean
          author_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          content: string
          hero_image?: string | null
          published_at?: string | null
          is_draft?: boolean
          author_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          content?: string
          hero_image?: string | null
          published_at?: string | null
          is_draft?: boolean
          author_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
      }
      likes: {
        Row: {
          id: string
          post_id: string
          user_id: string | null
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id?: string | null
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string | null
          ip_address?: string | null
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          author_id: string | null
          author_name: string | null
          author_email: string | null
          content: string
          is_approved: boolean
          parent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_id: string
          author_id?: string | null
          author_name?: string | null
          author_email?: string | null
          content: string
          is_approved?: boolean
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          author_id?: string | null
          author_name?: string | null
          author_email?: string | null
          content?: string
          is_approved?: boolean
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      media: {
        Row: {
          id: string
          filename: string
          original_filename: string
          file_path: string
          file_size: number
          mime_type: string
          width: number | null
          height: number | null
          alt_text: string | null
          caption: string | null
          uploaded_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          filename: string
          original_filename: string
          file_path: string
          file_size: number
          mime_type: string
          width?: number | null
          height?: number | null
          alt_text?: string | null
          caption?: string | null
          uploaded_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          filename?: string
          original_filename?: string
          file_path?: string
          file_size?: number
          mime_type?: string
          width?: number | null
          height?: number | null
          alt_text?: string | null
          caption?: string | null
          uploaded_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_post_stats: {
        Args: {
          post_uuid: string
        }
        Returns: {
          like_count: number
          comment_count: number
        }[]
      }
      user_has_liked_post: {
        Args: {
          post_uuid: string
          user_uuid?: string
        }
        Returns: boolean
      }
      toggle_post_like: {
        Args: {
          post_uuid: string
        }
        Returns: boolean
      }
      get_published_posts: {
        Args: {
          limit_count?: number
          offset_count?: number
        }
        Returns: {
          id: string
          title: string
          slug: string
          description: string | null
          hero_image: string | null
          published_at: string
          author_name: string | null
          author_avatar: string | null
          like_count: number
          comment_count: number
          tags: string[]
        }[]
      }
      search_posts: {
        Args: {
          search_query: string
          limit_count?: number
        }
        Returns: {
          id: string
          title: string
          slug: string
          description: string | null
          hero_image: string | null
          published_at: string
          author_name: string | null
          rank: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Convenience types
export type User = Database['public']['Tables']['users']['Row']
export type Post = Database['public']['Tables']['posts']['Row']
export type Tag = Database['public']['Tables']['tags']['Row']
export type Like = Database['public']['Tables']['likes']['Row']
export type Comment = Database['public']['Tables']['comments']['Row']
export type Media = Database['public']['Tables']['media']['Row']

export type PostInsert = Database['public']['Tables']['posts']['Insert']
export type PostUpdate = Database['public']['Tables']['posts']['Update']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']
export type CommentInsert = Database['public']['Tables']['comments']['Insert']
export type CommentUpdate = Database['public']['Tables']['comments']['Update']
export type MediaInsert = Database['public']['Tables']['media']['Insert']
export type MediaUpdate = Database['public']['Tables']['media']['Update']

// Extended types with relations
export interface PostWithStats extends Post {
  author: User
  like_count: number
  comment_count: number
  tags: Tag[]
  user_has_liked?: boolean
}

export interface CommentWithAuthor extends Comment {
  author?: User
  replies?: CommentWithAuthor[]
}