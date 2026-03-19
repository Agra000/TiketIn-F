import { Link } from "react-router-dom";

interface Props {
  img: string;
  title: string;
}

export default function FilmCard({ img, title }: Props) {
  return (
    // Kirim title melalui state agar bisa dibaca di halaman tujuan
    <Link to="/cinema" state={{ movieTitle: title }} className="group">
      <div className="flex flex-col items-center cursor-pointer transition-all duration-300 group-hover:scale-105">
        <div className="w-[240px] h-[360px] overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl">
          <img
            src={img}
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>

        <p className="text-base font-semibold mt-3 text-center uppercase group-hover:text-green-600 transition-all duration-200">
          {title}
        </p>
      </div>
    </Link>
  );
}