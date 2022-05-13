import {createConnection, getManager} from "typeorm";
import { Permission } from "../entity/permission.entity";
import { Role } from "../entity/role.entity";

createConnection().then(async connection => {
    const permissionRepository = getManager().getRepository(Permission);

    const perms = ['view_users', 'edit_users', 'view_roles', 'edit_roles', 'view_videogames', 'edit_videogames']
    let permissions = [];

    for (let i = 0; i < perms.length; i++) {
        permissions.push(await permissionRepository.save({
            name: perms[i]
        }));
    }

    const roleRepository = getManager().getRepository(Role);
    await roleRepository.save({
        name: 'Admin',
        permissions         // tutti i permessi
    })

    delete permissions[3];  // edit_roles
    delete permissions[1];  // edit_users
    delete permissions[5];  // edit_products

    await roleRepository.save({
        name: 'Viewer',
        permissions
    })

    process.exit(0);
});