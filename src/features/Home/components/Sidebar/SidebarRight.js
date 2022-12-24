import React, { Fragment, useEffect, useState, useRef } from 'react'
import postsApi from 'src/api/posts.api'
import useQuery from 'src/hooks/useQuery'
import ReactAudioPlayer from 'react-audio-player'
import { AssetsHelpers } from 'src/helpers/AssetsHelpers'
import SVG from 'react-inlinesvg'
import PerfectScrollbar from 'react-perfect-scrollbar'
import clsx from 'clsx'

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
}

function SidebarRight(props) {
  const [User, setUser] = useState()
  const [InfoMp3, setInfoMp3] = useState()
  const [, setLoading] = useState(false)
  const [active, setActive] = useState(0)
  const { id } = useQuery()

  const audioRef = useRef()

  useEffect(() => {
    if (id) {
      getDetailPost()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => getMp3(), [])

  const getDetailPost = () => {
    postsApi
      .getPostID(id)
      .then(({ data }) => {
        setLoading(false)
        setUser(data)
      })
      .catch(error => console.log(error))
  }

  const getMp3 = () => {
    postsApi
      .getCateID(15)
      .then(({ data }) => {
        setInfoMp3(data)
      })
      .catch(error => console.log(error))
  }

  const handleAudio = (time, index) => {
    if (audioRef.current.audioEl.current) {
      audioRef.current.audioEl.current.pause()
      audioRef.current.audioEl.current.currentTime = time
      audioRef.current.audioEl.current.play()
      setActive(index)
    }
  }

  return (
    <PerfectScrollbar
      options={perfectScrollbarOptions}
      className="scroll h-100"
      style={{ position: 'relative' }}
    >
      <div className="p-15px p-md-25px controls-mp3">
        <ReactAudioPlayer
          className="w-100"
          ref={audioRef}
          src={InfoMp3?.acf?.file_mp3}
          autoPlay
          controls
          controlsList={'nodownload'}
        />
        <div className="controls-video">
          <div className="title">Nghe tư vấn Online về giải pháp EZS</div>
          <ul>
            <li
              className={clsx(active === 0 && 'text-danger')}
              onClick={() => handleAudio(0, 0)}
            >
              1. Nghe toàn bộ
            </li>
            <li
              className={clsx(active === 1 && 'text-danger')}
              onClick={() => handleAudio(InfoMp3?.acf?.mo_hinh_he_thong, 1)}
            >
              2. Mô hình hệ thống
            </li>
            <li
              className={clsx(active === 2 && 'text-danger')}
              onClick={() => handleAudio(InfoMp3?.acf?.chuc_nang_co_ban, 2)}
            >
              3. Chức năng cơ bản
            </li>
          </ul>
        </div>
      </div>
      <div className="p-15px p-md-25px">
        <a className="navlink-svg mb-15px" href="https://ezs.vn/app-khach-hang">
          <div className="navlink-svg__icon">
            <div className="symbol">
              <span className="svg-icon">
                <SVG
                  src={AssetsHelpers.toAbsoluteUrl(
                    '/media/svg/icons/Shopping/Chart-bar1.svg'
                  )}
                />
              </span>
            </div>
          </div>
          <div className="navlink-svg__text">
            <h6>App khách hàng có gì ?</h6>
            <div className="desc">Các chức năng APP khách hàng</div>
          </div>
        </a>
        <a className="navlink-svg" href="https://ezs.vn/thiet-bi-tich-hop">
          <div className="navlink-svg__icon">
            <div className="symbol">
              <span className="svg-icon">
                <SVG
                  src={AssetsHelpers.toAbsoluteUrl(
                    '/media/svg/icons/General/Attachment2.svg'
                  )}
                />
              </span>
            </div>
          </div>
          <div className="navlink-svg__text">
            <h6>EZS tích hợp thiết bị gì ?</h6>
            <div className="desc">Tổng hợp các thiết bị sử dụng</div>
          </div>
        </a>
      </div>
      {User && (
        <div className="user-use p-15px p-md-25pxp-25px">
          <h3>Tài khoản trải nghiệm</h3>
          <div className="user-use-list">
            <Fragment>
              <ul>
                <li>
                  <div className="label">Link Phần mềm</div>
                  <div className="title">
                    <a
                      href={User?.acf?.link_phan_mem}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {User?.acf?.link_phan_mem}
                    </a>
                  </div>
                </li>
                <li>
                  <div className="label">Tài khoản đăng nhập</div>
                  <div className="title">{User?.acf?.tai_khoan}</div>
                </li>
                <li>
                  <div className="label">Mật khẩu</div>
                  <div className="title">{User?.acf?.mat_khau}</div>
                </li>
                <li>
                  <div className="label">Website</div>
                  <div className="title">{User?.acf?.website}</div>
                </li>
                <li>
                  <div className="label">Tên APP</div>
                  <div className="title">
                    {User?.acf?.ten_app_appstore_chplay}
                  </div>
                </li>
              </ul>
            </Fragment>
          </div>
        </div>
      )}
    </PerfectScrollbar>
  )
}

export default SidebarRight
