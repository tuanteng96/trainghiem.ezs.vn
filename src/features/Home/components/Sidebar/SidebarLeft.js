import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import useQuery from 'src/hooks/useQuery'

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
}

function SidebarLeft(props) {
  const { PostsList } = useSelector(({ posts }) => ({
    PostsList: posts.PostsList
  }))
  const { id } = useQuery()

  return (
    <Fragment>
      <div className="top">
        <h4>Các bước trải nghiệm</h4>
      </div>
      <PerfectScrollbar
        options={perfectScrollbarOptions}
        className="scroll sidebar-navs"
        style={{ position: 'relative' }}
      >
        <ul className="list-">
          {PostsList &&
            PostsList.map((cate, index) => (
              <li key={index}>
                <NavLink to="/">{cate.name}</NavLink>
                <ul>
                  {cate.Items &&
                    cate.Items.map((item, idx) => (
                      <li key={idx}>
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? 'text-danger' : ''
                          }
                          to={`${cate.slug}/${item.slug}.html${
                            id ? '?id=' + id : ''
                          }`}
                        >
                          <i className="menu-bullet menu-bullet-dot">
                            <span></span>
                          </i>
                          <span>{item.title.rendered}</span>
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
        </ul>
      </PerfectScrollbar>
      <div className="sidebar-footer">
        <div>Bạn cần tìm hiểu chức năng khác</div>
        <div>
          Liên hệ: 0981883338 hoặc Fanpage để được tư vấn và demo qua zoom,
          ultraview, ...
        </div>
      </div>
    </Fragment>
  )
}

export default SidebarLeft
