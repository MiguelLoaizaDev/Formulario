# Registro de Usuarios con React

Esta es una aplicación desarrollada en React que permite registrar usuarios con información básica y filtrar los registros según criterios específicos. La aplicación utiliza una API REST para guardar y obtener los datos.

## Funcionalidades

- Registro de usuarios con los campos:
  - **Nombre**
  - **Código**
  - **Simulación** (opcional)
  - **Lectura Crítica** (opcional)
- Visualización de una lista de registros.
- Filtros para mostrar:
  - Todos los registros.
  - Solo registros con **Simulación**.
  - Solo registros con **Lectura Crítica**.
  - Registros con ambos campos seleccionados.
- Envío de datos a un servidor mediante una API REST.
- Recuperación de datos desde el servidor.

## Tecnologías Utilizadas

- **React**: Biblioteca para construir la interfaz de usuario.
- **Axios**: Para realizar solicitudes HTTP.
- **CSS**: Para los estilos de la aplicación.

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Ejecuta la aplicación en modo de desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.

La página se recargará automáticamente si realizas cambios en el código.\
También verás errores en la consola si los hay.

### `npm test`

Ejecuta el corredor de pruebas en modo interactivo.\
Consulta la sección sobre [ejecución de pruebas](https://facebook.github.io/create-react-app/docs/running-tests) para más información.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.\
Optimiza la construcción para el mejor rendimiento.

Los archivos están minificados y los nombres de archivo incluyen hashes.\
Tu aplicación estará lista para ser desplegada.

Consulta la sección sobre [despliegue](https://facebook.github.io/create-react-app/docs/deployment) para más información.

## Cómo Usar la Aplicación

1. Clona este repositorio.
2. Instala las dependencias con `npm install`.
3. Ejecuta el servidor backend (asegúrate de que esté configurado en `http://localhost:5000`).
4. Inicia la aplicación con `npm start`.
5. Usa la interfaz para registrar usuarios y filtrar los datos.

## Estructura del Proyecto

- **src/componentes/registro.jsx**: Componente principal que contiene el formulario de registro y la lista de registros.
- **src/stylesheets/registro.css**: Archivo de estilos para el componente de registro.

## API Endpoints

- **POST /guardar**: Guarda un nuevo registro.
- **GET /obtener-datos**: Obtiene la lista de registros.

## Próximas Mejoras

- Validación más avanzada de los campos del formulario.
- Implementación de mensajes de error más detallados.
- Diseño responsivo para dispositivos móviles.

## Autor

Desarrollado por Miguel Loaiza.

## Licencia

Este proyecto está bajo la licencia MIT.
