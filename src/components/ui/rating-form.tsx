"use client"

import * as React from "react"
import { StarRating } from "@/components/ui/star-rating"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RatingFormProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  onRatingSubmit: (rating: number, feedback: string) => Promise<void>
  isSubmitting?: boolean
}

const RatingForm = React.forwardRef<HTMLDivElement, RatingFormProps>(
  ({ onRatingSubmit, isSubmitting = false, className, ...props }, ref) => {
    const [rating, setRating] = React.useState(0)
    const [feedback, setFeedback] = React.useState("")
    const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null)

    const handleSubmit = async () => {
      if (rating === 0) {
        setMessage({ type: "error", text: "Please select a rating." })
        return
      }

      try {
        await onRatingSubmit(rating, feedback)
        setMessage({ type: "success", text: "Rating submitted successfully!" })
        setRating(0)
        setFeedback("")
      } catch (error) {
        if (error instanceof Error) {
          setMessage({ type: "error", text: error.message })
        } else {
          setMessage({ type: "error", text: "Failed to submit rating." })
        }
      }
    }

    return (
      <div ref={ref} className={cn("border p-4 rounded-md shadow-md w-full", className)} {...props}>
        <h3 className="text-lg font-semibold mb-2">Rate the Tutor</h3>

        {/* Custom Star Rating Component */}
        <StarRating value={rating} onChange={setRating} className="mb-3" />

        {/* Feedback Textarea */}
        <textarea
          className="w-full p-2 border rounded-md mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={3}
          placeholder="Write your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        {/* Submit Button using `Button.tsx` */}
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting} 
          variant="default" 
          className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit Rating"}
        </Button>

        {/* Success/Error Message */}
        {message && (
          <p className={cn("mt-2 text-sm font-medium", message.type === "success" ? "text-green-600" : "text-red-600")}>
            {message.text}
          </p>
        )}
      </div>
    )
  }
)

RatingForm.displayName = "RatingForm"

export { RatingForm }
