import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import postsApi from 'src/api/posts.api'

function DetailPost(props) {
  const { slug } = useParams()
  const [Post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getDetailPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  const getDetailPost = () => {
    setLoading(true)
    postsApi
      .getPostSlug(slug)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setPost(data[0])
          setLoading(false)
        }
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      {loading && 'Đang tải'}
      {!loading && (
        <Fragment>
          {Post && (
            <div>
              <h2>{Post.title.rendered}</h2>
              {Post?.acf?.video_youtube && (
                <div>
                  <iframe
                    className="w-100 h-500px"
                    src={`https://www.youtube.com/embed/${Post?.acf?.video_youtube}`}
                    title="Video"
                  ></iframe>
                </div>
              )}
              <div>
                <div
                  dangerouslySetInnerHTML={{ __html: Post.content.rendered }}
                ></div>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </div>
  )
}

export default DetailPost
