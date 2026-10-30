import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Home from './home';

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: React.ComponentProps<'a'>) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('tool directory filters', () => {
  it('keeps search, category, and filter controls keyboard navigable', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const search = screen.getByRole('searchbox', { name: 'Search tools by name, description, or category' });
    const category = screen.getByRole('combobox', { name: 'Filter by category' }) as HTMLSelectElement;
    const submit = screen.getByRole('button', { name: 'Filter' });

    await user.tab();
    expect(document.activeElement).toBe(search);
    await user.tab();
    expect(document.activeElement).toBe(category);
    await user.tab();
    expect(document.activeElement).toBe(submit);
  });
});