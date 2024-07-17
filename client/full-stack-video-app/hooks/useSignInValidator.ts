export const useSignInValidator = (email: string, password: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
        return 'All fields must be included';
    }

    if (!email || !emailRegex.test(email)) {

        return 'Please enter a valid email.';
    }

    if (!password || password.length < 6) {
        return 'Password must be at least 6 characters.';
    }

    return null;
}
