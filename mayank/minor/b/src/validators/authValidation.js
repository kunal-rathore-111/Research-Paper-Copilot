const { z } = require('zod');

const signSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, 'Password must have atleast 5 characters')
    .max(100, 'Password size out of limit of characters')
    .refine((val) => /[A-Z]/.test(val), { message: 'Password must have one uppercase character' })
    .refine((val) => /[a-z]/.test(val), { message: 'Password must have one lowercase character' })
    .refine((val) => /[0-9]/.test(val), { message: 'Password must have one numeric value' })
    .refine((val) => /[_$%#@!?/]/.test(val), { message: 'Password must have one special character (_$%#@!?/)' }),
});

module.exports = signSchema;
