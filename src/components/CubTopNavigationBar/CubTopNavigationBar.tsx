import React from 'react';
import { Badge } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWrench,
  faCircleQuestion,
  faBoltLightning,
  faBell,
  faArrowsRotate,
  faChevronRight,
  faRobot,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { themeColorsLight } from '@/tokens/colors';
import { fontFamily, fontSize, fontWeight, lineHeightPx } from '@/tokens/typography';
import { borderRadius, padding } from '@/tokens/spacing';
import { iconSize } from '@/tokens/icons';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CubTopNavBreadcrumb {
  key: string;
  label: string;
  /** Optional icon shown before the first breadcrumb item only */
  icon?: IconDefinition;
  onClick?: () => void;
}

export interface CubTopNavTab {
  key: string;
  label: string;
}

export interface CubTopNavigationBarProps {
  // ── Breadcrumbs ────────────────────────────────────────────────────────────
  /** Breadcrumb trail shown on the left. Max label width is 170 px (ellipsis). */
  breadcrumbs?: CubTopNavBreadcrumb[];

  // ── Tabs ───────────────────────────────────────────────────────────────────
  /** Show the tab bar after the breadcrumbs */
  showTabs?: boolean;
  tabs?: CubTopNavTab[];
  activeTabKey?: string;
  onTabChange?: (key: string) => void;

  // ── Action slots ───────────────────────────────────────────────────────────
  /** Show the config shortcut (wrench) button */
  showConfigShortcut?: boolean;
  /** Show the help (?) button */
  showHelp?: boolean;
  /** Show the quick-access (⚡) button */
  showQuickAccess?: boolean;
  /** Show the AI notifications (robot) button (Remi-style) */
  showAiNotifications?: boolean;
  /** Show the notifications (bell) button */
  showNotifications?: boolean;
  /** Show the Workflows text button */
  showWorkflows?: boolean;

  // ── Notification badge ─────────────────────────────────────────────────────
  /** Number shown in the red badge on the notifications button. 0 hides it. */
  notificationCount?: number;

  // ── User avatar ────────────────────────────────────────────────────────────
  /** Initials displayed in the circular user avatar */
  userInitials?: string;
  /** Avatar background color — defaults to colorPrimary */
  userColor?: string;

  // ── Callbacks ──────────────────────────────────────────────────────────────
  onConfigClick?: () => void;
  onHelpClick?: () => void;
  onQuickAccessClick?: () => void;
  onAiNotificationsClick?: () => void;
  onNotificationsClick?: () => void;
  onWorkflowsClick?: () => void;
  onUserClick?: () => void;
}

// ─── Internal: icon-only action button ───────────────────────────────────────

type ActionButtonVariant = 'primary' | 'remi';

interface ActionButtonProps {
  icon: IconDefinition;
  variant?: ActionButtonVariant;
  onClick?: () => void;
  title?: string;
  /** Render a badge on top-right */
  badge?: number;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  variant = 'primary',
  onClick,
  title,
  badge,
}) => {
  const bg =
    variant === 'remi' ? themeColorsLight.colorRemiBg : themeColorsLight.colorPrimaryBg;
  const color =
    variant === 'remi' ? themeColorsLight.colorRemiText : themeColorsLight.colorPrimaryText;

  const btn = (
    <div
      role="button"
      tabIndex={0}
      title={title}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: borderRadius.borderRadius,
        background: bg,
        cursor: 'pointer',
        flexShrink: 0,
        color,
        fontSize: iconSize.iconSize,
        position: 'relative',
      }}
    >
      <FontAwesomeIcon icon={icon} style={{ width: iconSize.iconSize, height: iconSize.iconSize }} />
    </div>
  );

  if (badge && badge > 0) {
    return (
      <div style={{ position: 'relative', flexShrink: 0 }}>
        {btn}
        <div
          style={{
            position: 'absolute',
            top: -3,
            right: -3,
            background: themeColorsLight.colorError,
            color: themeColorsLight.colorTextLightSolid,
            fontFamily,
            fontSize: fontSize.fontSizeXS,
            fontWeight: fontWeight.medium,
            lineHeight: `${lineHeightPx.lineHeightSM}px`,
            height: 16,
            minWidth: 16,
            paddingLeft: badge > 9 ? padding.paddingXXS : 0,
            paddingRight: badge > 9 ? padding.paddingXXS : 0,
            borderRadius: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            pointerEvents: 'none',
          }}
        >
          {badge > 99 ? '99+' : badge}
        </div>
      </div>
    );
  }

  return btn;
};

// ─── Internal: Workflows text + icon button ───────────────────────────────────

const WorkflowsButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <div
    role="button"
    tabIndex={0}
    title="Workflows"
    onClick={onClick}
    onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: padding.paddingXXS,
      height: 32,
      paddingLeft: padding.paddingXS,
      paddingRight: padding.paddingXS,
      borderRadius: borderRadius.borderRadius,
      background: themeColorsLight.colorPrimaryBg,
      cursor: 'pointer',
      flexShrink: 0,
      color: themeColorsLight.colorPrimaryText,
    }}
  >
    <FontAwesomeIcon
      icon={faArrowsRotate}
      style={{ width: iconSize.iconSize, height: iconSize.iconSize, fontSize: iconSize.iconSize }}
    />
    <span
      style={{
        fontFamily,
        fontSize: fontSize.fontSize,
        fontWeight: fontWeight.medium,
        lineHeight: `${lineHeightPx.lineHeight}px`,
        color: themeColorsLight.colorPrimaryText,
        whiteSpace: 'nowrap',
      }}
    >
      Workflows
    </span>
  </div>
);

// ─── Internal: Tab item ───────────────────────────────────────────────────────

const TabItem: React.FC<{
  tab: CubTopNavTab;
  active: boolean;
  onClick: () => void;
}> = ({ tab, active, onClick }) => (
  <div
    role="tab"
    tabIndex={0}
    aria-selected={active}
    onClick={onClick}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      paddingLeft: padding.paddingXXS,
      paddingRight: padding.paddingXXS,
      paddingTop: padding.paddingXS,
      paddingBottom: padding.paddingXS,
      gap: padding.paddingXS,
      borderBottom: active
        ? `2px solid ${themeColorsLight.colorPrimary}`
        : `1px solid ${themeColorsLight.colorBorderSecondary}`,
      cursor: 'pointer',
      flexShrink: 0,
      boxSizing: 'border-box',
    }}
  >
    <span
      style={{
        fontFamily,
        fontSize: fontSize.fontSize,
        fontWeight: active ? fontWeight.medium : fontWeight.normal,
        lineHeight: `${lineHeightPx.lineHeight}px`,
        color: active ? themeColorsLight.colorPrimaryText : themeColorsLight.colorText,
        maxWidth: 190,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        textAlign: 'center',
      }}
    >
      {tab.label}
    </span>
  </div>
);

// ─── Internal: Breadcrumb ─────────────────────────────────────────────────────

const Breadcrumbs: React.FC<{ items: CubTopNavBreadcrumb[] }> = ({ items }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: padding.paddingXXS,
      flexShrink: 0,
    }}
  >
    {items.map((item, index) => (
      <React.Fragment key={item.key}>
        {/* Separator before every item except the first */}
        {index > 0 && (
          <FontAwesomeIcon
            icon={faChevronRight}
            style={{
              fontSize: iconSize.iconSizeXS,
              width: iconSize.iconSizeXS,
              color: themeColorsLight.colorTextQuaternary,
              flexShrink: 0,
            }}
          />
        )}

        {/* Leading icon (typically on first item only) */}
        {item.icon && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 28,
              fontSize: iconSize.iconSizeXL,
              color: themeColorsLight.colorPrimaryText,
              flexShrink: 0,
            }}
          >
            <FontAwesomeIcon
              icon={item.icon}
              style={{ width: iconSize.iconSizeXL, height: iconSize.iconSizeXL }}
            />
          </div>
        )}

        {/* Label */}
        <span
          title={item.label}
          onClick={item.onClick}
          style={{
            fontFamily,
            fontSize: fontSize.fontSize,
            fontWeight: fontWeight.strong,
            lineHeight: `${lineHeightPx.lineHeight}px`,
            color: themeColorsLight.colorText,
            maxWidth: 170,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            cursor: item.onClick ? 'pointer' : 'default',
          }}
        >
          {item.label}
        </span>
      </React.Fragment>
    ))}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const CubTopNavigationBar: React.FC<CubTopNavigationBarProps> = ({
  breadcrumbs = [
    { key: 'item1', label: 'Menu Item', icon: faWrench },
    { key: 'item2', label: 'Menu Item 2' },
    { key: 'item3', label: 'Menu Item 3' },
  ],
  showTabs = true,
  tabs = [
    { key: 'tab1', label: 'Navigation Item' },
    { key: 'tab2', label: 'Navigation Item' },
    { key: 'tab3', label: 'Navigation Item' },
    { key: 'tab4', label: 'Navigation Item' },
  ],
  activeTabKey,
  onTabChange,
  showConfigShortcut = false,
  showHelp = true,
  showQuickAccess = true,
  showAiNotifications = true,
  showNotifications = true,
  showWorkflows = true,
  notificationCount = 8,
  userInitials = 'EJ',
  userColor,
  onConfigClick,
  onHelpClick,
  onQuickAccessClick,
  onAiNotificationsClick,
  onNotificationsClick,
  onWorkflowsClick,
  onUserClick,
}) => {
  const resolvedActiveTab = activeTabKey ?? tabs[0]?.key;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: padding.padding,
        height: 52,
        background: themeColorsLight.colorBgContainer,
        borderBottom: `1px solid ${themeColorsLight.colorBorderSecondary}`,
        paddingLeft: padding.paddingXS,
        paddingRight: padding.paddingSM,
        width: '100%',
        boxSizing: 'border-box',
        flexShrink: 0,
      }}
    >
      {/* ── Left: Breadcrumbs + Tabs ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: padding.padding,
          height: '100%',
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Tabs */}
        {showTabs && tabs.length > 0 && (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              borderBottom: `1px solid ${themeColorsLight.colorBorderSecondary}`,
              minWidth: 0,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: padding.padding,
                height: '100%',
                overflowX: 'auto',
                overflowY: 'clip',
                // Hide scrollbar but keep scrollable
                scrollbarWidth: 'none',
              }}
            >
              {tabs.map((tab) => (
                <TabItem
                  key={tab.key}
                  tab={tab}
                  active={tab.key === resolvedActiveTab}
                  onClick={() => onTabChange?.(tab.key)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Right: Actions ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: padding.paddingXS,
          flexShrink: 0,
        }}
      >
        {/* Config Shortcut */}
        {showConfigShortcut && (
          <ActionButton icon={faWrench} variant="primary" title="Config" onClick={onConfigClick} />
        )}

        {/* Help */}
        {showHelp && (
          <ActionButton icon={faCircleQuestion} variant="primary" title="Help" onClick={onHelpClick} />
        )}

        {/* Quick Access */}
        {showQuickAccess && (
          <ActionButton icon={faBoltLightning} variant="primary" title="Quick Access" onClick={onQuickAccessClick} />
        )}

        {/* AI Notifications */}
        {showAiNotifications && (
          <ActionButton icon={faRobot} variant="remi" title="AI Notifications" onClick={onAiNotificationsClick} />
        )}

        {/* Notifications with badge */}
        {showNotifications && (
          <ActionButton
            icon={faBell}
            variant="primary"
            title="Notifications"
            badge={notificationCount}
            onClick={onNotificationsClick}
          />
        )}

        {/* Workflows */}
        {showWorkflows && <WorkflowsButton onClick={onWorkflowsClick} />}

        {/* User Avatar */}
        <div
          role="button"
          tabIndex={0}
          title={`User: ${userInitials}`}
          onClick={onUserClick}
          onKeyDown={(e) => e.key === 'Enter' && onUserClick?.()}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: userColor ?? themeColorsLight.colorPrimary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily,
              fontSize: fontSize.fontSizeSM,
              fontWeight: fontWeight.strong,
              lineHeight: `${lineHeightPx.lineHeightSM}px`,
              color: themeColorsLight.colorTextLightSolid,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {userInitials}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CubTopNavigationBar;
