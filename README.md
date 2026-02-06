## Comentarios sobre el desarrollo

**Decisiones de diseño:**
- Clean Architecture con separación en capas (core, api, infrastructure)
- Inversión de dependencias mediante interfaces en core/
- Patrón Repository para abstracción de acceso a datos
- Middlewares separados para autenticación y validación
- Controladores thin que delegan lógica a servicios

**Tecnologías utilizadas:**
- Node.js con Express.js como framework de servidor
- TypeScript con tipado estricto para mayor mantenibilidad
- Firebase Firestore como base de datos NoSQL
- JWT (JSON Web Tokens) para autenticación stateless
- express-validator para validación de entrada
- CORS configurado para permitir origines específicos

**Comentarios clave:**
- La arquitectura permite cambiar Firebase por otra base de datos sin afectar la lógica de negocio
- Los middlewares de autenticación protegen todas las rutas excepto health check
- El sistema de login automático crea usuarios en primer acceso simplificando el flujo
- La estructura de controladores y rutas facilita la escalabilidad del API

## License

MIT License - see LICENSE file for details.
