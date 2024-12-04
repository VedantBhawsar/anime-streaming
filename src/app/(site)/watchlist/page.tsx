import Image from "next/image";

export default function WishList() {
  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-4 text-purple-800">My WatchList</h1>
      <div className="gap-5 grid grid-cols-4">
        {[1, 2, 3, 4].map((anime) => (
          <div
            key={anime}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="bg-gray-200 aspect-[2/3] rounded-lg mb-2 relative overflow-hidden">
              <Image
                fill
                src={
                  "https://static.wikia.nocookie.net/jujutsu-kaisen/images/0/0e/Volume_1.png/revision/latest?cb=20200905220554&path-prefix=es"
                }
                alt="poster"
              />
            </div>
            <h4 className="text-base font-semibold truncate">
              Related Anime Title
            </h4>
            <p className="text-smtext-gray-600">Studio Name</p>
          </div>
        ))}
      </div>
    </div>
  );
}
