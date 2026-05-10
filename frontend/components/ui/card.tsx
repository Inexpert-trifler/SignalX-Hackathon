import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Premium card variants
export const PremiumCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "glass" | "gradient" | "interactive";
  }
>(({ className, variant = "default", children, ...props }, ref) => {
  const variants = {
    default: "card-premium",
    glass: "card-glass",
    gradient: "bg-gradient-to-br from-background to-muted/20 border-border/50",
    interactive: "interactive-card",
  };

  return (
    <Card
      ref={ref}
      className={cn(variants[variant], className)}
      {...props}
    >
      {children}
    </Card>
  );
});
PremiumCard.displayName = "PremiumCard";

// AI Card component for AI-generated content
export const AICard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    confidence?: number;
    isAnalyzing?: boolean;
  }
>(({ className, confidence, isAnalyzing = false, children, ...props }, ref) => {
  return (
    <Card
      ref={ref}
      className={cn(
        "relative overflow-hidden border-signal-cyan/20 bg-gradient-to-br from-signal-cyan/5 to-transparent",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-signal-cyan/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        className
      )}
      {...props}
    >
      {(confidence !== undefined || isAnalyzing) && (
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {isAnalyzing && (
            <div className="w-2 h-2 bg-signal-cyan rounded-full animate-pulse" />
          )}
          {confidence !== undefined && (
            <div className="text-xs text-signal-cyan font-medium">
              {Math.round(confidence * 100)}% confidence
            </div>
          )}
        </div>
      )}
      {children}
    </Card>
  );
});
AICard.displayName = "AICard";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
