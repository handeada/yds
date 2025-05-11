import React from "react";

type SkeletonProps = {
  className?: string;
  height?: string;
  width?: string;
  count?: number;
  circle?: boolean;
};

type SkeletonSectionProps = {
  title?: boolean;
  lines?: number;
  className?: string;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  height = "h-4",
  width = "w-full",
  count = 1,
  circle = false,
}) => {
  const baseClasses = `bg-gray-200 animate-pulse rounded ${height} ${width} ${className}`;
  const shapeClasses = circle ? "rounded-full" : "rounded";

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className={`${baseClasses} ${shapeClasses} mb-3`} />
      ))}
    </>
  );
};

export const SkeletonText: React.FC<SkeletonProps> = ({
  className = "",
  height = "h-5",
  width = "w-full",
  count = 1,
}) => {
  const widths = ["w-full", "w-5/6", "w-4/5", "w-11/12", "w-3/4"];

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className={`bg-gray-200 animate-pulse rounded ${height} ${
            width === "w-full" && index > 0
              ? widths[index % widths.length]
              : width
          } ${className} mb-3`}
        />
      ))}
    </>
  );
};

export const SkeletonSection: React.FC<SkeletonSectionProps> = ({
  title = true,
  lines = 3,
  className = "",
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {title && <Skeleton height="h-7" width="w-3/4" className="mb-4" />}
      <SkeletonText count={lines} />
      <div className="mb-6 mt-4">
        <Skeleton height="h-10" className="mb-2" />
        <Skeleton height="h-10" width="w-5/6" />
      </div>
    </div>
  );
};

export const SkeletonTable: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 5,
  columns = 1,
}) => {
  return (
    <div className="animate-pulse w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="h-5 bg-gray-200 rounded w-32" />
        <div className="flex space-x-2">
          <div className="h-8 w-20 bg-gray-200 rounded" />
          <div className="h-8 w-24 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="h-9 bg-gray-200 rounded-md mb-4 w-full" />

      <div className="h-10 bg-gray-200 rounded-t mb-1 w-full" />

      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex space-x-1 mb-2">
          {[...Array(columns)].map((_, j) => (
            <div
              key={j}
              className="h-12 bg-gray-200 rounded flex-1"
              style={{ minWidth: `${Math.max(80, 100 / columns)}px` }}
            />
          ))}
        </div>
      ))}

      <div className="flex justify-between items-center mt-4">
        <div className="h-6 bg-gray-200 rounded w-24" />
        <div className="flex space-x-1">
          <div className="h-8 w-8 bg-gray-200 rounded" />
          <div className="h-8 w-8 bg-gray-200 rounded" />
          <div className="h-8 w-12 bg-gray-200 rounded" />
          <div className="h-8 w-8 bg-gray-200 rounded" />
          <div className="h-8 w-8 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonCards: React.FC<{ count?: number; columns?: number }> = ({
  count = 6,
  columns = 3,
}) => {
  return (
    <div className="p-5 bg-gray-50 rounded-md shadow mt-4">
      <div className="h-7 bg-gray-200 rounded-md w-3/5 mb-5 mx-auto animate-pulse"></div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-4`}
      >
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkeletonStatistics: React.FC = () => {
  return (
    <div className="p-5 bg-gray-50 rounded-md shadow mt-4">
      <div className="h-7 bg-gray-200 rounded-md w-3/5 mb-5 mx-auto animate-pulse"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
