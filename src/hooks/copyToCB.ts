import { toast } from 'sonner'

export const copyToClipboard = async (
    text: string,
    successMessage: string = 'คัดลอกข้อความแล้ว!',
    errorMessage: string = 'ไม่สามารถคัดลอกข้อความได้'
): Promise<void> => {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text)
            toast.success(successMessage)
        } 
        else {
            const textArea = document.createElement('textarea')
            textArea.value = text
            textArea.style.position = 'fixed'
            textArea.style.left = '-999999px'
            textArea.style.top = '-999999px'
            document.body.appendChild(textArea)
            textArea.focus()
            textArea.select()
        
            const successful = document.execCommand('copy')
            document.body.removeChild(textArea)
        
            if (successful) {
                toast.success(successMessage)
            } else {
                throw new Error('Copy command failed')
            }
        }
    } catch (error) {
        console.error('Failed to copy text: ', error)
        toast.error(errorMessage)
    }
}
