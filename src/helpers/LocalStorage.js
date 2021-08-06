export function limpiarSesion() {
    localStorage.clear();
    return true;
};

export function limpiarSesionXItem(listaItems) {
    if (listaItems == null || listaItems.length <= 0) {
        return false;
    }
    for (let item in listaItems) {
        localStorage.setItem(listaItems[item], null);
    }
    return true;
};

export async function agregarSesionXItem(item, valor) {
    await localStorage.setItem(item, JSON.stringify(valor));
    return true;
};

export async function  getSesionXItem(item) {
    if (item == null) {
        return null;
    }
    return JSON.parse(await localStorage.getItem(item));
};
