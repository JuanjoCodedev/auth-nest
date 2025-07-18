<p align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://jwt.io/" target="_blank">
    <img src="https://cdn.worldvectorlogo.com/logos/jwt-3.svg" width="120" alt="JWT Logo" />
  </a>
   &nbsp;&nbsp;&nbsp;
  <a href="https://jwt.io/" target="_blank">
    <img src="https://www.cdnlogo.com/logos/p/79/passport.svg" width="100" alt="JWT Logo" />
  </a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Autenticación con permisos

Este proyecto es una aplicación de autenticación que permite a los usuarios registrarse, iniciar sesión y acceder a recursos basados en permisos específicos, utilizando PostgreSQL como base de datos.

## 📋 Características del Proyecto

| Característica                                | Descripción                                                                                             |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 🧾 Registro de usuarios                       | Los usuarios pueden crear una cuenta en el sistema.                                                     |
| 🔐 Inicio de sesión seguro                    | Acceso mediante credenciales con notificación por correo si se detecta un inicio de sesión inusual.     |
| 🔁 Recuperación y actualización de contraseña | Soporte para restablecer contraseña automáticamente o manualmente mediante un enlace enviado por email. |
| 📚 Administración dinámica de rutas           | El frontend gestiona rutas activas por rol mediante switches, enviando el array completo al backend.    |
| 🚧 Protección de rutas                        | Acceso restringido a rutas según los permisos asignados al usuario o al rol que tiene asignado.         |
| 🎭 Control de acceso basado en roles          | Se permite o deniega el acceso a rutas específicas según el rol del usuario (admin, editor, etc).       |
| 🔑 Autenticación JWT                          | Implementación de JSON Web Tokens para validar sesiones de usuario de manera segura.                    |
| ♻️ Tokens de renovación (refresh tokens)      | Permite mantener la sesión activa sin necesidad de reautenticación frecuente.                           |
| 🌐 Autenticación social                       | Inicio de sesión o registro mediante cuentas de Google o Microsoft.                                     |

## 🗺️ Diagrama de Base de Datos

Puedes visualizar el modelo de datos utilizado por el proyecto en el siguiente enlace:

🔗 [Ver diagrama en dbdiagram.io](https://dbdiagram.io/d/auth-684cced03cc77757c8d952bc)

## ⚙️ Requisitos Previos

| Requisito                  | Descripción                                                                  |
| -------------------------- | ---------------------------------------------------------------------------- |
| 🟢 **Node.js**             | Versión 14 o superior (preferiblemente v16 o v18 para mejor compatibilidad). |
| 🛢️ **PostgreSQL**          | Sistema de base de datos relacional utilizado para persistencia.             |
| 📦 **npm o yarn**          | Gestores de paquetes para instalar las dependencias del proyecto.            |
| 🐳 **Docker** _(opcional)_ | Recomendado para el desarrollo local y despliegue en contenedores.           |

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/JuanjoCodedev/auth-nest.git
```

2. Configura la base de datos `PostgreSQL` y crea un archivo `.dev.env` en la raíz del proyecto con la siguiente configuración:

```env
NODE_ENV=development # o production

PORT=3000
HOST_DATABASE=localhost
POSTGRES_PORT=5432
POSTGRES_USER=tu-usuario
POSTGRES_PASSWORD=tu-contraseña
DATABASE=nombre-de-tu-base-de-datos

SECRET_KEY=clave-secreta
EXPIRED_TOKEN=1h
EXPIRED_REFRESH_TOKEN=7d

GOOGLE_CLIENT_ID=tu-client-id-google
GOOGLE_CLIENT_SECRET=tu-client-secret-google
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/redirect
```

### 💡 Observación

Si vas a utilizar `Docker`, cambia la línea:

```env
HOST_DATABASE=localhost
```

por:

```env
HOST_DATABASE=db
```

**Nota:** Reemplaza los valores del archivo `.dev.env` por los mismos utilizados en tu archivo `docker-compose.yml`. Ejemplo:

```env
HOST_DATABASE=db
POSTGRES_PORT=5432
POSTGRES_USER=root
POSTGRES_PASSWORD=root
DATABASE=root
```

---

## ⚙️ Ejecución de la API

### Opción A: Con Docker

- Asegúrate de tener `Docker` instalado en tu sistema.
- Verifica que tengas un archivo `.dev.env` con la configuración adecuada (ver pasos anteriores).
- Luego ejecuta:

```bash
docker-compose up --build
```

Esto iniciará la aplicación, la base de datos `PostgreSQL` y accede a `Adminer` desde:

```
http://localhost:8080
```

---

### Opción B: Sin Docker

- Asegúrate de tener `PostgreSQL` instalado y configurado correctamente.
- Crea tu archivo `.dev.env` como se explicó anteriormente.
- Instala las dependencias:

```bash
npm install
```

- Ejecuta el servidor en modo build para pruebas de correo:

```bash
npm run build-and-start
```

- O en modo desarrollo:

```bash
npm run start:dev
```

El servidor estará disponible en `http://localhost:3000` tambien puedes ingesar `http://localhost:3000/api` para el uso de `Swagger`.

---

## 📬 Endpoints Principales

| Nombre                             | Ruta                 | Método | Cuerpo de Ejemplo                                                               |
| ---------------------------------- | -------------------- | ------ | ------------------------------------------------------------------------------- |
| Iniciar sesión                     | `/auth/sign-in`      | POST   | `{ "email": "correo@ejemplo.com", "password": "123456789" }`                    |
| Crear cuenta                       | `/auth/signUp`       | POST   | `{ "name": "usuario", "email": "correo@ejemplo.com", "password": "123456789" }` |
| Actualizar estado                  | `/user/:id`          | PUT    | _Ninguno_                                                                       |
| Actualizar perfil                  | `/user/profile/:id`  | PATCH  | `{ "name": "usuario", "email": "correo@ejemplo.com", "password": "123456789" }` |
| Registrar Rol                      | `/role`              | POST   | `{ "name": "client" }`                                                          |
| Asignar permiso a usuario por ruta | `/user-route-access` | POST   | `{ "user_id": 3, "routes": ["user/:id", "user/profile/:id"] }`                  |
| Asignar permiso al rol             | `/role-route-access` | POST   | `{ "role_id": 3, "routes": ["user/:id", "user/profile/:id"] }`                  |

---

## 🧪 Pruebas

Puedes ejecutar las pruebas end-to-end con:

```bash
npm run test:e2e
```

---

## 🤝 Contribución

1. Haz un fork del repositorio.

2. Crea una nueva rama:

```bash
git checkout -b feature/nueva-caracteristica
```

3. Realiza tus cambios y haz commit:

```bash
git commit -am "Añadir nueva característica"
```

4. Sube tus cambios:

```bash
git push origin feature/nueva-caracteristica
```

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

---

## 👥 Créditos

Desarrollado por [JuanjoCodedev](https://github.com/JuanjoCodedev)
