
const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Path to the backend to be called

// Backend registration service
export async function registerUser(registerData: { username: string; email: string; password: string }) {
    const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar el usuario");
    }

    return await response.json();
}

// Backend verification service
export async function verifyUser(code: string) {
    const response = await fetch(`${apiUrl}/auth/verificate?code=${code}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        return { error: data.message || "Error al verificar el usuario" };
    }

    return data;
}

// Backend login service
export async function loginUser(registerData: { username: string; password: string }) {
    const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesion en el usuario");
    }

    return await response.json();
}