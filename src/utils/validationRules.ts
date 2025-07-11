export const validationRules: Record<string, RegExp> = {
    first_name: /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
    second_name: /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
    login: /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
    oldPassword: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
    newPassword: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
    phone: /^\+?\d{10,15}$/,
    message: /^(?!\s*$).+/,
};

export const errorMessages: Record<string, string> = {
    first_name: 'Первая буква заглавная, только буквы или дефис',
    second_name: 'Первая буква заглавная, только буквы или дефис',
    login: 'От 3 до 20 символов, латиница, цифры, - или _',
    email: 'Неверный формат email',
    password: 'От 8 до 40 символов, хотя бы 1 заглавная и цифра',
    oldPassword: 'От 8 до 40 символов, хотя бы 1 заглавная и цифра',
    newPassword: 'От 8 до 40 символов, хотя бы 1 заглавная и цифра',
    phone: 'От 10 до 15 цифр, может начинаться с +',
    message: 'Сообщение не может быть пустым',
};
