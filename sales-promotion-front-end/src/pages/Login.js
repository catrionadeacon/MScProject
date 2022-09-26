import "../styles/page.css"
import { LoginComponent } from "../components/page-components/LoginComponents"

export function Login() {
    return (
        <div className="page">
            <div className="pageCentre">
                <LoginComponent/>
            </div>
        </div>
    )
}