import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import postsApi from 'src/api/posts.api'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Skeleton from 'react-loading-skeleton'
import { PostsContext } from '../../Home'
import { Helmet } from 'react-helmet'

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
}

function DetailPost(props) {
  const { slug } = useParams()
  const [Post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)

  const { onOpen } = useContext(PostsContext)

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
    <div className="h-100 bg-white">
      <Helmet>
        <title>{loading ? 'Đang tải ...' : Post?.yoast_head_json.title}</title>
      </Helmet>
      {
        <Fragment>
          <div className="title-top">
            <h3 className="text-truncate">
              {loading && <Skeleton height={20} width={300} />}
              {!loading && Post?.title.rendered}
            </h3>
            <div className="btn-menu" onClick={onOpen}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
          <PerfectScrollbar
            options={perfectScrollbarOptions}
            className="scroll p-15px p-md-25px view-content"
            style={{ position: 'relative' }}
          >
            {loading && (
              <Fragment>
                <Skeleton count={5} />
                <Skeleton className="mb-20px" count={1} width={200} />
                <Skeleton count={5} />
              </Fragment>
            )}
            {!loading && Post?.acf?.video_youtube && (
              <div className="mb-10px videos-ytb">
                <iframe
                  className="w-100"
                  src={`https://www.youtube.com/embed/${Post?.acf?.video_youtube}`}
                  title="Video"
                ></iframe>
              </div>
            )}
            {!loading && (
              <div
                dangerouslySetInnerHTML={{ __html: Post?.content.rendered }}
              ></div>
            )}
          </PerfectScrollbar>
        </Fragment>
      }
    </div>
  )
}

export default DetailPost
