'use client';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from 'motion/react';
import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils';

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  imageSrc: string;
  openInNewTab?: boolean;
};

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  imageSrc,
  openInNewTab = false,
}: LinkPreviewProps) => {
  const [isOpen, setOpen] = React.useState(false);

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);

  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Reduce the effect to make it subtle
    x.set(offsetFromCenter);
  };

  const trigger = React.isValidElement<React.HTMLAttributes<HTMLElement>>(
    children,
  ) ? (
    React.cloneElement(children, {
      onMouseMove: handleMouseMove,
      className: cn(children.props.className, className),
    })
  ) : (
    <button
      type="button"
      onMouseMove={handleMouseMove}
      className={cn(
        'inline-flex items-center border-0 bg-transparent p-0 text-inherit appearance-none',
        className,
      )}
    >
      {children}
    </button>
  );

  return (
    <>
      {isMounted ? (
        <span className="sr-only">
          <Image
            src={imageSrc}
            width={width}
            height={height}
            alt="preview preloader"
          />
        </span>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCardPrimitive.Trigger asChild>
          {trigger}
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Portal>
          <HoverCardPrimitive.Content
            className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
            side="top"
            align="center"
            sideOffset={10}
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                    },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  className="rounded-xl shadow-xl"
                  style={{
                    x: translateX,
                  }}
                >
                  <a
                    href={url}
                    target={openInNewTab ? '_blank' : undefined}
                    rel={openInNewTab ? 'noreferrer' : undefined}
                    className="block rounded-xl border-2 border-transparent bg-white p-1 shadow hover:border-neutral-200 dark:hover:border-neutral-800"
                    style={{ fontSize: 0 }}
                  >
                    <Image
                      src={imageSrc}
                      width={width}
                      height={height}
                      className="rounded-lg"
                      alt="preview image"
                    />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </HoverCardPrimitive.Content>
        </HoverCardPrimitive.Portal>
      </HoverCardPrimitive.Root>
    </>
  );
};
