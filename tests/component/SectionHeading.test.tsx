import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SectionHeading from "@/components/SectionHeading";

describe("SectionHeading", () => {
  it("renders the title as a level-2 heading", () => {
    render(<SectionHeading title="Featured products" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Featured products");
  });

  it("renders the eyebrow label when provided, and omits it when not", () => {
    const { unmount } = render(<SectionHeading eyebrow="The lineup" title="Featured products" />);
    expect(screen.getByText("The lineup")).toBeInTheDocument();
    unmount();

    render(<SectionHeading title="No eyebrow here" />);
    expect(screen.queryByText("The lineup")).not.toBeInTheDocument();
  });

  it("wires accentColor into the swatch/rule inline styles", () => {
    const { container } = render(
      <SectionHeading eyebrow="Capabilities" title="What powers it" accentColor="rgb(1, 2, 3)" />,
    );
    // The eyebrow tick + the rule segment both use accentColor as background.
    const accented = [...container.querySelectorAll<HTMLElement>("*")].filter(
      (el) => el.style.background === "rgb(1, 2, 3)",
    );
    expect(accented.length).toBeGreaterThanOrEqual(2);
  });

  it("falls back to the light default accent (#f5f5f5) when no accentColor is given", () => {
    const { container } = render(<SectionHeading eyebrow="x" title="y" />);
    // jsdom normalizes the #f5f5f5 hex to rgb() in the inline style.
    const accented = [...container.querySelectorAll<HTMLElement>("*")].filter(
      (el) => el.style.background === "rgb(245, 245, 245)",
    );
    expect(accented.length).toBeGreaterThanOrEqual(2);
  });
});
