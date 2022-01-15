import { Dispatch, RefObject, SetStateAction, useEffect } from "react"

export function useGetPhotoAPI(
  buttonSearch: RefObject<HTMLButtonElement>,
  buttonNext: RefObject<HTMLButtonElement>,
  buttonBack: RefObject<HTMLButtonElement>,
  input: RefObject<HTMLInputElement>,
  loadingIndicator: RefObject<HTMLDivElement>,
  information: RefObject<HTMLDivElement>,
  setImages: (value: string[]) => void,
  next: string | null,
  back: string | null,
  setNext: Dispatch<SetStateAction<null>>,
  setBack: Dispatch<SetStateAction<null>>
): void {


  useEffect(() => {

    const btnSearch: HTMLButtonElement | null = buttonSearch.current
    const btnNext: HTMLButtonElement | null = buttonNext.current
    const btnBack: HTMLButtonElement | null = buttonBack.current

    if (next && buttonNext.current) {
      buttonNext.current.style.visibility = "visible";
    } else if (buttonNext.current) {
      buttonNext.current.style.visibility = "hidden";
    }

    if (back && buttonBack.current) {
      buttonBack.current.style.visibility = "visible";
    } else if (buttonBack.current) {
      buttonBack.current.style.visibility = "hidden";
    }

    async function handlerClickSearch() {
      if (input.current) {
        if (loadingIndicator.current) {
          loadingIndicator.current.style.display = "block";
        }
        try {
          const result = await search(input.current.value);
          renderImg(result.photos);
          if (result.next_page) {
            setNext(result.next_page);
          } else if (next) {
            setNext(null);
          }
          if (back) {
            setBack(null);
          }
          if (result.photos.length > 0 && information.current) {
            information.current.innerText = "";
          }
          if (result.photos.length === 0 && information.current) {
            throw new Error();
          }
        } catch {
          if (information.current) {
            information.current.innerText = "По данному запросу ничего не найдено";
          }
        }
        if (loadingIndicator.current) {
          loadingIndicator.current.style.display = "none";
        }
      }
    }

    async function handlerClickLink(event: Event) {
      const link = event.target === buttonNext.current ? next : back;
      if (input.current) {
        if (loadingIndicator.current) {
          loadingIndicator.current.style.display = "block";
        }
        try {
          const result = await search(input.current.value, link);
          if (loadingIndicator.current) {
            loadingIndicator.current.style.display = "none";
          }
          renderImg(result.photos);
          if (result.next_page) {
            setNext(result.next_page);
          } else if (next) {
            setNext(null);
          }
          if (result.prev_page) {
            setBack(result.prev_page);
          } else if (back) {
            setBack(null);
          }
        } catch {
          if (information.current) {
            information.current.innerText = "Ссылка недействительна";
          }
        }
      }
    }

    function renderImg(photos: any[]) {
      const arr: string[] = [];
      for (let item of photos) {
        arr.push(item.src.large);
      }
      setImages(arr);
    }


    if (btnSearch) btnSearch.addEventListener("click", handlerClickSearch);
    if (btnNext) btnNext.addEventListener("click", handlerClickLink);
    if (btnBack) btnBack.addEventListener("click", handlerClickLink);
    return () => {
      if (btnSearch) btnSearch.removeEventListener("click", handlerClickSearch)
      if (btnNext) btnNext.removeEventListener("click", handlerClickLink)
      if (btnBack) btnBack.removeEventListener("click", handlerClickLink)
    }
  });
}


async function search(query: string, src: string | null = null) {
  if (query.split(' ').join('') !== "") {
    let response = await fetch(src ? src : 'https://api.pexels.com/v1/search?per_page=20&locale=ru-RU&query=' + query, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Pexels/JavaScript",
        // "Authorization": '563492ad6f91700001000001cf263b7519584f7fa301d119d96b629c',
        // "Authorization": '563492ad6f917000010000019c0b3566c70e42328eb3340748668ddf',
        // "Authorization": '563492ad6f917000010000010b6c64ee2ba847d1bc2d064fd821c6a5',
        "Authorization": '563492ad6f91700001000001cbbc3b7fe6c14a5faa262d8d356ad945',
      },
    });
    return await response.json();
  }

}