---
title: 'Building Interactive React Islands in Astro'
description: 'Discover how to add selective interactivity to your Astro site using React components and client directives.'
pubDate: 2025-01-18
heroImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop'
tags: ['react', 'astro', 'interactivity', 'islands']
draft: false
---

# Building Interactive React Islands in Astro

One of Astro's most powerful features is its ability to create "islands" of interactivity within otherwise static pages. This approach gives you the best of both worlds: fast-loading static content with interactive components exactly where you need them.

## Understanding Islands Architecture

The islands architecture is a paradigm where:
- Most of your page is static HTML
- Interactive components are "islands" of JavaScript
- Each island loads and hydrates independently
- You control when and how components become interactive

## Client Directives

Astro provides several client directives to control hydration:

### `client:load`
Hydrates the component immediately when the page loads:
```astro
<MyComponent client:load />
```

### `client:idle`
Hydrates when the browser becomes idle:
```astro
<MyComponent client:idle />
```

### `client:visible`
Hydrates when the component enters the viewport:
```astro
<MyComponent client:visible />
```

### `client:media`
Hydrates based on media queries:
```astro
<MyComponent client:media="(max-width: 768px)" />
```

## Building a React Island

Here's an example of a simple interactive counter:

```tsx
// src/components/react/Counter.tsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border rounded-lg">
      <p className="text-lg mb-2">Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Increment
      </button>
    </div>
  );
}
```

Then use it in your Astro component:
```astro
---
import Counter from '../components/react/Counter.tsx';
---

<html>
  <body>
    <h1>My Static Page</h1>
    <p>This content is static and loads instantly.</p>
    
    <!-- This component becomes interactive -->
    <Counter client:load />
  </body>
</html>
```

## Best Practices

### Choose the Right Directive
- Use `client:load` for critical interactive components
- Use `client:visible` for below-the-fold components
- Use `client:idle` for non-critical enhancements

### Keep Islands Small
- Break large components into smaller islands
- Only make interactive parts into islands
- Keep static content as Astro components

### Performance Considerations
- Monitor your JavaScript bundle size
- Use `client:visible` for performance-critical pages
- Consider lazy loading for heavy components

## Real-World Examples

Common use cases for React islands:
- **Search components**: Interactive search with real-time results
- **Forms**: Contact forms with validation and submission
- **Carousels**: Image galleries with navigation
- **Comments**: Interactive comment systems
- **Shopping carts**: E-commerce functionality

## Conclusion

React islands in Astro provide a perfect balance between performance and interactivity. By carefully choosing when and how to hydrate components, you can create fast, engaging websites that provide excellent user experiences.

The key is to start with static content and add interactivity only where it adds real value to your users.