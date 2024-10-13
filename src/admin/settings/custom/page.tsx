import type { SettingConfig } from "@medusajs/admin"
//import { CustomIcon } from "../../icons/custom"

const CustomSettingPage = () => {
    return (
        <div>
            <h1>Custom Setting Peycim</h1>
        </div>
    )
}

export const config: SettingConfig = {
    card: {
        label: "Custom",
        description: "Manage your custom settings",
        // optional
        //icon: CustomIcon,
    },
}

export default CustomSettingPage