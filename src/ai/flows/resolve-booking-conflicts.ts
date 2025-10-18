'use server';

/**
 * @fileOverview An AI-powered tool to resolve seminar hall booking conflicts.
 *
 * - resolveBookingConflict - A function that takes in conflicting booking requests and suggests alternatives.
 * - ConflictResolutionInput - The input type for the resolveBookingConflict function.
 * - ConflictResolutionOutput - The return type for the resolveBookingConflict function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConflictResolutionInputSchema = z.object({
  conflictingBookings: z.array(
    z.object({
      bookingId: z.string().describe('The ID of the booking request.'),
      userType: z
        .string()
        .describe(
          'The type of user making the booking (e.g., HOD, TPO, Club, College Management).' + 'Valid values: HOD, TPO, Club, College Management'
        ),
      priority: z
        .number()
        .describe(
          'The priority level of the user type, where lower numbers indicate higher priority (e.g., 1 for TPO, 2 for College Management, 3 for HOD, 4 for Club).' + 'Valid values: 1, 2, 3, 4'
        ),
      hallName: z.string().describe('The name of the seminar hall requested.'),
      eventDetails: z.string().describe('Details about the event to be held.'),
      startTime: z.string().describe('The start time of the requested booking.'),
      endTime: z.string().describe('The end time of the requested booking.'),
    })
  ).describe('An array of conflicting seminar hall booking requests.'),
});
export type ConflictResolutionInput = z.infer<typeof ConflictResolutionInputSchema>;

const ConflictResolutionOutputSchema = z.object({
  suggestedAlternatives: z.array(
    z.object({
      bookingId: z.string().describe('The ID of the original booking request.'),
      alternativeHall: z.string().describe('A suggested alternative hall, if available.'),
      alternativeTime: z.string().describe('A suggested alternative time slot, if available.'),
      justification: z
        .string()
        .describe(
          'The AI explanation for why this alternative is suggested, considering event details and user priority.'
        ),
    })
  ).describe('An array of suggested alternative booking options.'),
});
export type ConflictResolutionOutput = z.infer<typeof ConflictResolutionOutputSchema>;

export async function resolveBookingConflict(input: ConflictResolutionInput): Promise<ConflictResolutionOutput> {
  return resolveBookingConflictFlow(input);
}

const resolveBookingConflictPrompt = ai.definePrompt({
  name: 'resolveBookingConflictPrompt',
  input: {schema: ConflictResolutionInputSchema},
  output: {schema: ConflictResolutionOutputSchema},
  prompt: `You are an AI assistant tasked with resolving conflicting seminar hall booking requests. Given the following conflicting booking requests, analyze the event details, user priorities, and hall availability to suggest alternative times or halls for each request. Prioritize TPO bookings, followed by College Management, HODs, and then Clubs. Provide a justification for each suggested alternative.

Conflicting Bookings:
{{#each conflictingBookings}}
- Booking ID: {{this.bookingId}}
  - User Type: {{this.userType}}
  - Priority: {{this.priority}}
  - Hall Name: {{this.hallName}}
  - Event Details: {{this.eventDetails}}
  - Start Time: {{this.startTime}}
  - End Time: {{this.endTime}}
{{/each}}

Consider the following:
*   Hall availability (assume you have access to real-time hall availability data).
*   Event details (e.g., importance, required setup).
*   User priorities (TPO > College Management > HODs > Clubs).

Output should be in the following JSON format:
{
  "suggestedAlternatives": [
    {
      "bookingId": "booking id",
      "alternativeHall": "hall name or null",
      "alternativeTime": "time slot or null",
      "justification": "explanation"
    }
  ]
}
`,
});

const resolveBookingConflictFlow = ai.defineFlow(
  {
    name: 'resolveBookingConflictFlow',
    inputSchema: ConflictResolutionInputSchema,
    outputSchema: ConflictResolutionOutputSchema,
  },
  async input => {
    const {output} = await resolveBookingConflictPrompt(input);
    return output!;
  }
);
