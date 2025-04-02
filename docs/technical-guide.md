# Technical Guide for Modern E-commerce Platform

This guide provides technical information for developers who want to customize, extend, or troubleshoot the e-commerce platform.

## Architecture Overview

The platform is built with:
- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: Clerk
- **Payment Processing**: Paystack
- **AI Integration**: OpenAI API
- **Email**: Resend

### Directory Structure

## Advanced Customization

### Custom Hooks

The platform includes several custom hooks in the `hooks/` directory:

1. **use-toast.ts**: Toast notification system
2. **use-mobile.ts**: Mobile device detection

To create a new custom hook:
1. Create a new file in the `hooks/` directory
2. Export your hook function

Example:
\`\`\`tsx
// hooks/use-scroll-position.ts
import { useState, useEffect } from 'react';

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return scrollPosition;
}
\`\`\`

### Server Actions

The platform uses Next.js Server Actions for server-side operations:

1. **app/actions/generate-description.ts**: Generate product descriptions
2. **app/actions/send-test-email.ts**: Send test emails

To create a new server action:
1. Create a new file in the `app/actions/` directory
2. Add the 'use server' directive at the top of the file
3. Export your server action function

Example:
\`\`\`tsx
// app/actions/update-product.ts
'use server'

import { revalidatePath } from 'next/cache';

export async function updateProduct(productId: string, data: any) {
  try {
    // Update product in database
    // ...
    
    // Revalidate product page
    revalidatePath(`/products/${productId}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error updating product:', error);
    return { success: false, error: 'Failed to update product' };
  }
}
\`\`\`

### Middleware

The platform uses Next.js Middleware for authentication and route protection:

1. **middleware.ts**: Controls protected routes

To customize middleware:
1. Modify the `middleware.ts` file
2. Update the `config` object to include new routes

Example:
\`\`\`tsx
// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/products(.*)",
    "/categories(.*)",
    "/about",
    "/contact",
    "/docs(.*)", // Add new public routes here
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
\`\`\`

## Testing

### Unit Testing

The platform can be tested with Jest and React Testing Library:

1. Install testing dependencies:
   \`\`\`bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   \`\`\`

2. Create test files with the `.test.tsx` extension

Example:
\`\`\`tsx
// components/product-card.test.tsx
import { render, screen } from '@testing-library/react';
import ProductCard from './product-card';

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(
      <ProductCard
        id="1"
        name="Test Product"
        price={99.99}
        image="/test-image.jpg"
        category="Test Category"
      />
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });
  
  it('displays discount correctly', () => {
    render(
      <ProductCard
        id="1"
        name="Test Product"
        price={99.99}
        image="/test-image.jpg"
        category="Test Category"
        discount={10}
      />
    );
    
    expect(screen.getByText('$89.99')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('10% OFF')).toBeInTheDocument();
  });
});
\`\`\`

### Integration Testing

For integration testing, you can use Cypress:

1. Install Cypress:
   \`\`\`bash
   npm install --save-dev cypress
   \`\`\`

2. Create Cypress tests in the `cypress/integration/` directory

Example:
\`\`\`js
// cypress/integration/product-page.spec.js
describe('Product Page', () => {
  it('loads a product page correctly', () => {
    cy.visit('/products/1');
    cy.get('h1').should('contain', 'Premium Leather Backpack');
    cy.get('.price').should('contain', '$129.99');
    cy.get('button').contains('Add to Cart').should('exist');
  });
  
  it('adds a product to cart', () => {
    cy.visit('/products/1');
    cy.get('button').contains('Add to Cart').click();
    cy.get('.cart-count').should('contain', '1');
  });
});
\`\`\`

## Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

### Coding Standards

1. Follow the existing code style
2. Use TypeScript for type safety
3. Write meaningful commit messages
4. Document your code with comments
5. Update documentation when necessary

### Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Describe your changes in the pull request
4. Link to any relevant issues
5. Wait for code review and address feedback

