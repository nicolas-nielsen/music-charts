import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex">
      <p>Loading...</p>
      <Image
        src="/image/loading.gif"
        alt="loader"
        width={100}
        height={100}
      />
    </div>
  );
}
