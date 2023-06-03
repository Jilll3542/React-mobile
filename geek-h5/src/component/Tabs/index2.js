import PropTypes from "prop-types";
import React from "react";
import styles from "./index.module.scss";

/**
 * Tab 容器组件
 * @param {Array} props.tabs 所有 Tab 选项按钮的配置数据
 * @param {Array} props.children 所有 Tab 选项按钮对应的内容数据
 * @param {Number} props.index 当前选中 Tab 的索引
 * @param {Function} props.onChange 切换 Tab 选项按钮时的回调函数
 */
const Tabs = ({ index = 0, tabs = [], children, onChange }) => {
  return (
    <div className={styles.root}>
      <div className="tabs">
        {/* tab 选项按钮容器 */}
        <div className="tabs-wrap">
          <div className="tabs-nav">
            {/* tab 选项按钮 */}
            <div className="tab active">
              <span>tab1</span>
            </div>
            <div className="tab">
              <span>tab2</span>
            </div>
            <div className="tab">
              <span>tab3</span>
            </div>
            <div className="tab">
              <span>tab4</span>
            </div>
            <div className="tab">
              <span>tab5</span>
            </div>

            {/* tab 底下的指示短线条 */}
            <div className="tab-line"></div>
          </div>
        </div>

        {/* tab 下面的主内容区域 */}
        <div className="tabs-content"></div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  // tabs 属性必传
  tabs: PropTypes.array.isRequired,

  // //children 属性值必须是界面元素
  // children: PropTypes.arrayOf(PropTypes.element),
};

export default Tabs;
