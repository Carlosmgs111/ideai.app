import { lazy, Suspense } from "react";

/* 
? Usar a nivel de MODULO, en la medida de lo posible evitar el uso a nivel de funciones o componentes.
! En caso contrario, asegurarse de que el lugar donde se implemente este MEMOIZADO, con esto se evita la doble importacion.
*/

export const lazyLoad = (importFunc: any, name: string) => {
  return lazy(() =>
    importFunc().then((module: any) => ({
      default: module[name],
    }))
  );
};

export const LazyComponent = ({
  children,
  fallback = <div>Cargando...</div>,
  Component,
  ...props
}: any) => {
  return (
    <Suspense fallback={fallback}>
      <Component {...props}>{children}</Component>
    </Suspense>
  );
};
