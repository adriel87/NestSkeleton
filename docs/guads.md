# Guards 

## Que es un Guard ??

pues si traducimos la palabra guard, podriamos decir que es tu guardia aunque mas bien seria la forma en la que te proteges.

En nest los Guard sirven para proteger las rutas en base a una serie de condiciones como : *permisos, roles, ...*

como normal general la Autenticacion es manejada por un middleware, si bien un middleware es capaz de manejar este tipo de problemas, sin embargo un middleware desconoce por definincion cual es el manjedor asociado a su ruta.

por otro lado los Guards tienen acceso al un contexto de ejecucion ***ExecutionContext***, basicamente es que conoce exactamente que es lo que se va a ejecutar a continuacion.

*Tip* se ejecutan antes que los middlewares y despues de los interceptors o [Pipes](pipes.md)

