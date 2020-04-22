import api from './api';

api.listen(PORT, () => {
    console.log(
        `VLife server app running in: http://localhost:${PORT} in the ${process.env.ENVIRONMENT} env WITH Typescript!!!`
    );
});

const app = api; // not necessary ...

export default app;
