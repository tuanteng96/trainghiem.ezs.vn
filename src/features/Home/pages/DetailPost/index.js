import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import postsApi from 'src/api/posts.api'
import PerfectScrollbar from 'react-perfect-scrollbar'

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
}

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
    <div className="h-100">
      {loading && 'Đang tải'}
      {!loading && (
        <Fragment>
          {Post && (
            <Fragment>
              <div className="title-top">
                <h3>{Post.title.rendered}</h3>
              </div>
              <PerfectScrollbar
                options={perfectScrollbarOptions}
                className="scroll p-25px view-content"
                style={{ position: 'relative'}}
              >
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
              </PerfectScrollbar>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  )
}

export default DetailPost
