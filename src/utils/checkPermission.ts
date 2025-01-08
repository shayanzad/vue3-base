import { AllPermissionsType } from "../models/Permissions.Interface"

export const checkPermission = (permission: AllPermissionsType) => {
    const localPermissions = localStorage.getItem('permissions')
    const userPermissions = JSON.parse(localPermissions!) as string[]

    if (userPermissions.length === 0) return true
    return userPermissions.includes(permission)
    
}