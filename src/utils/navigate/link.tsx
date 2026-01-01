import { useRouter } from "next/navigation";

export const useNavigation = () => {
    const router = useRouter()
    
    const toHome = () => {
        router.push("/")
    }
    
    const toGame = () => {
        router.push("/category")
    }
    
    return {
        toHome,
        toGame
    }
}