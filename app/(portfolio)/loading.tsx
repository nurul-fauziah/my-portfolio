export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#F3E3D0]">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#D2C4B4] border-t-[#81A6C6]" />
        <p className="text-sm uppercase tracking-[0.3em] text-[#8A7C70]">
          Loading...
        </p>
      </div>
    </div>
  );
}
