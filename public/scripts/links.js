window.onload = function () {
    const bookmarks = document.getElementsByClassName('bookmark');
    [...bookmarks].forEach(bookmark => {
        bookmark.style.cursor = 'pointer'
        bookmark.addEventListener('click', function (e) {
            let target = e.target.parentElement

            let headers = new Headers()
            headers.append('Accept', 'Application/JSON')

            let req = new Request(`/api/bookmarks/${target.dataset.post}`, {
                method: 'GET',
                mode: 'cors',
                headers
            })
            fetch(req)
                .then(res => res.json())
                .then(data => {
                    if (data.bookmark) {
                        target.innerHTML = '<i class="fa fa-bookmark" aria-hidden="true"></i>'
                    } else {
                        target.innerHTML = '<i class="fa fa-bookmark-o" aria-hidden="true"></i>'
                    }
                })
                .catch(e => {
                    console.log(e)
                    alert(e)
                })
        })
    })


//like dislike code here
    
    const likeBtn = document.getElementById("likeBtn")
    const dislikeBtn = document.getElementById("dislikeBtn")

    likeBtn.addEventListener('click', function (e) {
        let postId = likeBtn.dataset.post
        reqLikeDislike('likes', postId)
            .then(res => res.json())
            .then(data => {
                let likeText = data.liked ? 'Liked' : 'Like'
                likeText = likeText + ` | ${data.totalLikes}`
                let dislikeText = `Dislike | ${data.totalDislikes}`

                likeBtn.innerHTML = likeText
                dislikeBtn.innerHTML = dislikeText
            })
            .catch(e => {
                console.log(e)
            })
    })

    dislikeBtn.addEventListener('click', function (e) {
        let postId = likeBtn.dataset.post
        reqLikeDislike('dislikes', postId)
            .then(res => res.json())
            .then(data => {
                let dislikeText = data.disliked ? 'Disliked' : 'Dislike'
                dislikeText = dislikeText + ` | ${data.totalDislikes}`
                let likeText = `Like | ${data.totalLikes}`

                dislikeBtn.innerHTML = dislikeText
                likeBtn.innerHTML = likeText
            })
            .catch(e => {
                console.log(e)
            })
    })

    function reqLikeDislike(type, postId) {
        let headers = new Headers()
        headers.append('Aceept', 'Applicaton/JSON')
        headers.append('Content-Type', 'Application/JSON')

        let req = new Request(`/api/${type}/${postId}`, {
            method: 'GET',
            headers,
            mode: 'cors'

        })

        return fetch(req)

    }
//comment code here
    
    // const comment = document.getElementById('comments')
    // const commentHolder = document.getElementById('comment-holder')

    // comment.addEventListener('keypress', function (e) {
    //     if (e.key == 'Enter') {
    //         if (e.target.value) {
    //             let postId = comment.dataset.post
    //             let data1 = {
    //                 body: e.target.value
    //             }
    //             let req = generateRequest(`/api/comments/${postId}`, data1)

    //             fetch(req)
    //                 .then(res => res.json())
    //                 .then(data => {
    //                     let commentElement = createComment(data)
    //                     commentHolder.insertBefore(commentElement, commentHolder.children[0])
    //                     e.target.value = ''
    //                 })
    //                 .catch(e => {
    //                     console.log(e)
    //                     alert(e)
    //                 })
    //         } else {
    //             alert('Please Enter a valid comment')
    //         }
    //     }
    // })
    // function generateRequest(url, body) {
    //     let headers = new Headers()
    //     headers.append('Aceept', 'Applicaton/JSON')
    //     headers.append('Content-Type', 'Application/JSON')

    //     let req = new Request(url, {
    //         method: 'POST',
    //         headers,
    //         body: JSON.stringify(body),
    //         mode: 'cors'
    //     })
    //     return req
    // }

    // function createComment(comment) {
    //     let innerHTML = `<img src='${comment.profilePics}'class="rounded-circle mx-3 my-3" style="width: 40px;"><div class="media-body my-3"><p>'${comment.body}'</p></div><div class="my-3"><input type="text" class="from-control" name="reply" placeholder="Press Enter for reply" data-comment='${comment._id}'></div>`

    //     let div = document.createElement('div')
    //     div.className = 'media-border'
    //     div.innerHTML = innerHTML

    //     return div
    // }
}