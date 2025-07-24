import { useState, useEffect } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  // No props needed - automatically extracts headings from page
}

export default function TableOfContents({}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  // Extract headings from the page
  useEffect(() => {
    const extractHeadings = () => {
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const headingList: Heading[] = [];

      headingElements.forEach((heading) => {
        // Skip the main article title (first h1)
        if (heading.tagName === 'H1' && headingList.length === 0) {
          return;
        }

        let id = heading.id;
        
        // Generate ID if it doesn't exist
        if (!id) {
          id = heading.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') || '';
          heading.id = id;
        }

        if (id && heading.textContent) {
          headingList.push({
            id,
            text: heading.textContent,
            level: parseInt(heading.tagName.charAt(1))
          });
        }
      });

      setHeadings(headingList);
      setIsVisible(headingList.length > 0);
    };

    // Wait for content to be rendered
    const timer = setTimeout(extractHeadings, 100);
    return () => clearTimeout(timer);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    if (headings.length === 0) return;

    const observerOptions = {
      rootMargin: '-20% 0px -35% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all heading elements
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100; // Account for fixed header
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Don't render if no headings found
  if (!isVisible || headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-8">
        <details className="group">
          <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <span className="font-medium text-gray-900">Table of Contents</span>
            <svg 
              className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <nav className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
            <ul className="space-y-2">
              {headings.map(({ id, text, level }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`
                      block w-full text-left py-2 px-3 rounded-md text-sm transition-colors duration-200
                      ${level === 2 ? 'pl-3' : ''}
                      ${level === 3 ? 'pl-6' : ''}
                      ${level === 4 ? 'pl-9' : ''}
                      ${level >= 5 ? 'pl-12' : ''}
                      ${activeId === id 
                        ? 'bg-primary-50 text-primary-600 font-medium border-l-2 border-primary-500' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    {text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed top-32 right-8 w-64 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="font-heading font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
            Table of Contents
          </h3>
          <nav>
            <ul className="space-y-1">
              {headings.map(({ id, text, level }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`
                      block w-full text-left py-2 px-3 rounded-md text-sm transition-all duration-200
                      ${level === 2 ? 'pl-3' : ''}
                      ${level === 3 ? 'pl-6' : ''}
                      ${level === 4 ? 'pl-9' : ''}
                      ${level >= 5 ? 'pl-12' : ''}
                      ${activeId === id 
                        ? 'bg-primary-50 text-primary-600 font-medium border-l-2 border-primary-500 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                    title={text}
                  >
                    <span className="block truncate">
                      {text}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}