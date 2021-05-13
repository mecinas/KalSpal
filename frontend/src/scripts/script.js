export async function fetchAvatar(url, token) {
    const response = await fetch(url, {headers: {"Authorization": `Bearer ${token}`}});
    const img = await response.blob();
    const imgurl = URL.createObjectURL(img)
    console.log(imgurl)
    return imgurl;
}