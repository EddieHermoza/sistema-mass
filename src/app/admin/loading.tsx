
export default function Loading() {
  return (
    <>
      <section className="h-full w-full flex-center flex-col gap-5 ">
        <div className="loader"></div>
        <span className="text-2xl"> Cargando...</span>
      </section>
    </>
  );
}