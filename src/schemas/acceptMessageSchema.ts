import { z } from 'zod';

export const AcceptMessageScema = z.object({
   acceptMessage : z.boolean(),
})