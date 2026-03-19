import FilmCard from "./FilmCard";

export default function NowShowing() {
  const movies = [
    {
      title: "Fight Club",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2r4BnP3A_zNSaWjvlZmrBhmMnk2QVb7t_uYpkgNVk6_2Eib926FLwN7sMA7zRQbBkPzkEjnwj9Kq_HLCOXVKCN3CrN1v9&s&ec=121585077",
    },
    {
      title: "Everything Everywhere All At Once",
      img: "https://upload.wikimedia.org/wikipedia/id/1/1e/Everything_Everywhere_All_at_Once.jpg",
    },
    {
      title: "The Oddyssey",
      img: "https://m.media-amazon.com/images/M/MV5BN2MyYjk2MWMtODMyZS00MDUyLWE0OGQtOTQ3MGY0MDE0ZjVmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
    {
      title: "The Batman",
      img: "https://m.media-amazon.com/images/S/pv-target-images/3de84cca07fc963b66a01a5465c2638066119711e89c707ce952555783dd4b4f.jpg",
    },
    {
      title: "Pirates of the Caribbean",
      img: "https://m.media-amazon.com/images/M/MV5BMjE5MjkwODI3Nl5BMl5BanBnXkFtZTcwNjcwMDk4NA@@._V1_.jpg",
    },
  ];

  return (
    <div className="w-full py-10">
      <h2 className="text-3xl font-bold text-center mb-7 text-[#0A2A8C]">
        NOW SHOWING IN CINEMAS
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-5">
        {movies.map((m, i) => (
          <FilmCard key={i} img={m.img} title={m.title} />
        ))}
      </div>
    </div>
  );
}