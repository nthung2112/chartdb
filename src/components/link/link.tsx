import { cn } from '@/lib/utils';
import React from 'react';

export const Link = React.forwardRef<
    HTMLAnchorElement,
    React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, children, ...props }, ref) => {
    const href = props.href?.startsWith('/')
        ? `${import.meta.env.VITE_BASE_URL}${props.href}`
        : props.href;
    return (
        <a
            ref={ref}
            className={cn('text-pink-600 hover:underline', className)}
            {...props}
            href={href}
        >
            {children}
        </a>
    );
});

Link.displayName = 'Link';
