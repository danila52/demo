import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function Home() {
  const halls = [
    { title: "Большой банкетный зал", img: "https://picsum.photos/id/1015/800/500" },
    { title: "ресторан", img: "https://picsum.photos/id/133/800/500" },
    { title: "Закрытая веранда", img: "https://picsum.photos/id/201/800/500" },
    { title: "Летняя веранда", img: "https://picsum.photos/id/251/800/500" }
  ];

  return (
    <div>
      {/* Hero */}
      <div className="bg-dark text-white py-5 text-center" style={{ background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://picsum.photos/id/1015/1920/1080")', backgroundSize: 'cover' }}>
        <div className="container py-5">
          <h1 className="display-3 fw-bold">Банкетам.Нет</h1>
          <p className="lead fs-3">Лучшие площадки для вашего торжества</p>
          <a href="/booking" className="btn btn-warning btn-lg mt-4">Забронировать зал</a>
        </div>
      </div>

      {/* Слайдер */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Наши площадки</h2>
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 3000 }}
          navigation
          loop
          className="rounded-4 shadow"
        >
          {halls.map((hall, i) => (
            <SwiperSlide key={i}>
              <img src={hall.img} className="w-100" style={{ height: "500px", objectFit: "cover" }} alt={hall.title} />
              <div className="position-absolute bottom-0 start-0 bg-dark bg-opacity-75 text-white p-4 w-100">
                <h4>{hall.title}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Home;