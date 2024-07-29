import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="h-screen grid grid-cols-2 md:pt-12 pt-10 pb-20 lg:px-16 px-8 items-center overflow-y-scroll">
      <article className="lg:col-span-1 col-span-2 flex justify-center">
        <Image
          src={"/images/homepage.svg"}
          alt="home"
          width={350}
          height={350}
        />
      </article>
      <article className="lg:col-span-1 col-span-2 mt-8">
        <h1 className="font-bold text-2xl text--white mb-5 text-center lg:text-start">
          فروشگاه فرانت شاپ فروشگاهی برای شما
        </h1>
        <p className="text--white mb-5 text-justify text-sm max-w-[400px] lg:max-w-[450px] mx-auto lg:mr-0">
          فرانت شاپ فروشگاهی برای شماست ، تا وسایل و ابزار های دیجیتال خود را به
          همراه ضمانت و با قیمت مناسب و تخفیف های فوق‌العاده خریداری کنید تا از
          آن ها در جهت رشد خود استفاده کنید
        </p>
        <div className="flex justify-center lg:justify-start">
          <Link href="/products">
            <button className="btn text--white glassmorphism px-4 py-3 rounded-md hover:bg-blue-700">
              به صفحه محصولات بروید
            </button>
          </Link>
        </div>
      </article>
    </section>
  );
}
