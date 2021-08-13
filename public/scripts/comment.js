window.onload = function () {
    const comment = document.getElementById('comments')
    const commentHolder = document.getElementById('comment-holder')

    comment.addEventListener('keypress', function (e) {
        if (e.key == 'Enter') {
            if (e.target.value) {
                let postId = comment.dataset.post
                let data = {
                    body: e.target.value
                }
                let req = generateRequest(`/api/comments/${postId}`, data)

                fetch(req)
                    .then(res => res.json())
                    .then(data => {
                        let commentElement = createComment(data)
                        commentHolder.insertBefore(commentElement, commentHolder.children[0])
                        e.target.value = ''
                    })
                    .catch(e => {
                        console.log(e)
                        alert(e)
                    })
            } else {
                alert('Please Enter a valid ccmment')
            }
        }
    })
}

function generateRequest(url, body) {
    let headers = new Headers()
    headers.append('Aceept', 'Applicaton/JSON')
    headers.append('Content-Type', 'Application/JSON')

    let req = new Request(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        mode: 'cors'
    })
    return req
}

function createComment(comment) {
    let innerHTML = `<img src='${comment.body}'class="rounded-circle mx-3 my-3" style="width: 40px;"><div class="media-body my-3"><p>'${comment.body}'</p></div><div class="my-3"><input type="text" class="from-control" name="reply" placeholder="Press Enter for reply" data-comment='${comment._id}'></div>`

    let div = document.createElement('div')
    div.className = 'media-border'
    div.innerHTML = innerHTML

    return div
}