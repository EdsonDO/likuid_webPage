"use client";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import { ChevronDown, Phone } from 'lucide-react'
import './StaggeredMenu.css'

export interface StaggeredMenuItem {
  label: string
  ariaLabel: string
  link: string
  icon?: React.ElementType
  subItems?: { label: string; link: string }[]
}

export interface StaggeredMenuSocialItem {
  label: string
  link: string
  icon?: React.ElementType
}

export interface UserProfileItem {
  name: string
  email: string
  avatarUrl?: string
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right'
  colors?: string[]
  items?: StaggeredMenuItem[]
  socialItems?: StaggeredMenuSocialItem[]
  userProfile?: UserProfileItem
  displaySocials?: boolean
  displayItemNumbering?: boolean
  className?: string
  logoUrl?: string
  menuButtonColor?: string
  openMenuButtonColor?: string
  menuButtonBg?: string
  openMenuButtonBg?: string
  accentColor?: string
  isFixed?: boolean
  changeMenuColorOnOpen?: boolean
  closeOnClickAway?: boolean
  panelLogoUrl?: string
  onMenuOpen?: () => void
  onMenuClose?: () => void
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#272727', '#5A9E8D'],
  items = [],
  socialItems = [],
  userProfile,
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl,
  menuButtonColor = '#ffffff',
  openMenuButtonColor = '#010200',
  menuButtonBg = '#010200',
  openMenuButtonBg = '#ffffff',
  changeMenuColorOnOpen = true,
  accentColor = '#5A9E8D',
  isFixed = false,
  closeOnClickAway = true,
  panelLogoUrl,
  onMenuOpen,
  onMenuClose,
}) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)
  const [openSubMenus, setOpenSubMenus] = useState<number[]>([])
  const [openSocials, setOpenSocials] = useState(false)

  const panelRef = useRef<HTMLDivElement | null>(null)
  const preLayersRef = useRef<HTMLDivElement | null>(null)
  const preLayerElsRef = useRef<HTMLElement[]>([])

  const plusHRef = useRef<HTMLSpanElement | null>(null)
  const plusVRef = useRef<HTMLSpanElement | null>(null)
  const iconRef = useRef<HTMLSpanElement | null>(null)

  const textInnerRef = useRef<HTMLSpanElement | null>(null)
  const textWrapRef = useRef<HTMLSpanElement | null>(null)
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close'])

  const openTlRef = useRef<gsap.core.Timeline | null>(null)
  const closeTweenRef = useRef<gsap.core.Tween | null>(null)
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null)
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null)
  const colorTweenRef = useRef<gsap.core.Tween | null>(null)

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null)
  const busyRef = useRef(false)

  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null)

  // ---- Custom Scrollbar State ----
  const scrollBodyRef = useRef<HTMLDivElement | null>(null)
  const thumbRef = useRef<HTMLDivElement | null>(null)
  const [isScrollable, setIsScrollable] = useState(false)
  const [thumbTop, setThumbTop] = useState(0)
  const [thumbHeight, setThumbHeight] = useState(40)

  const updateThumb = useCallback(() => {
    const el = scrollBodyRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    const ratio = clientHeight / scrollHeight
    const newThumbHeight = Math.max(28, ratio * clientHeight)
    const maxThumbTop = clientHeight - newThumbHeight
    const newThumbTop = (scrollTop / (scrollHeight - clientHeight)) * maxThumbTop
    setThumbHeight(newThumbHeight)
    setThumbTop(newThumbTop)
    setIsScrollable(scrollHeight > clientHeight + 2)
  }, [])

  useEffect(() => {
    const el = scrollBodyRef.current
    if (!el) return
    const observer = new ResizeObserver(updateThumb)
    observer.observe(el)
    el.addEventListener('scroll', updateThumb, { passive: true })
    updateThumb()
    return () => {
      observer.disconnect()
      el.removeEventListener('scroll', updateThumb)
    }
  }, [open, updateThumb])

  // Recalcular thumb cuando se abren/cierran submenús
  useEffect(() => {
    // Delay para esperar la transición CSS de max-height
    const t1 = setTimeout(updateThumb, 50)
    const t2 = setTimeout(updateThumb, 350)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [openSubMenus, openSocials, updateThumb])

  // ---- Thumb drag logic ----
  const isDraggingRef = useRef(false)
  const dragStartYRef = useRef(0)
  const dragStartScrollTopRef = useRef(0)

  const handleThumbMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const el = scrollBodyRef.current
    if (!el) return
    isDraggingRef.current = true
    dragStartYRef.current = e.clientY
    dragStartScrollTopRef.current = el.scrollTop

    const onMove = (ev: MouseEvent) => {
      if (!isDraggingRef.current || !el) return
      const { scrollHeight, clientHeight } = el
      const trackHeight = clientHeight
      const delta = ev.clientY - dragStartYRef.current
      const scrollRatio = delta / trackHeight
      el.scrollTop = dragStartScrollTopRef.current + scrollRatio * (scrollHeight - clientHeight)
    }
    const onUp = () => {
      isDraggingRef.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current
      const preContainer = preLayersRef.current

      const plusH = plusHRef.current
      const plusV = plusVRef.current
      const icon = iconRef.current
      const textInner = textInnerRef.current

      if (!panel || !plusH || !plusV || !icon || !textInner) return

      let preLayers: HTMLElement[] = []
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[]
      }
      preLayerElsRef.current = preLayers

      const offscreen = position === 'left' ? -100 : 100
      gsap.set([panel, ...preLayers], { xPercent: offscreen, visibility: 'visible' })

      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 })
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 })
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' })

      gsap.set(textInner, { yPercent: 0 })

      if (toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor, backgroundColor: menuButtonBg })
      }
    })
    return () => ctx.revert()
  }, [menuButtonColor, position])

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current
    const layers = preLayerElsRef.current
    if (!panel) return null

    openTlRef.current?.kill()
    if (closeTweenRef.current) {
      closeTweenRef.current.kill()
      closeTweenRef.current = null
    }
    itemEntranceTweenRef.current?.kill()

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[]
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    ) as HTMLElement[]
    const socialsBlock = panel.querySelector('.sm-socials') as HTMLElement | null
    const userProfileEl = panel.querySelector('.sm-user-profile') as HTMLElement | null

    const layerStates = layers.map((el) => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }))
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'))

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 })
    if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as string]: 0 })
    if (socialsBlock) gsap.set(socialsBlock, { y: 25, opacity: 0 })
    if (userProfileEl) gsap.set(userProfileEl, { y: 20, opacity: 0 })

    const tl = gsap.timeline({ paused: true })

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07)
    })

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0)
    const panelDuration = 0.65

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    )

    if (itemEls.length) {
      const itemsStartRatio = 0.15
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio

      tl.to(
        itemEls,
        { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },
        itemsStart
      )

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: 'power2.out',
            ['--sm-num-opacity' as string]: 1,
            stagger: { each: 0.08, from: 'start' },
          },
          itemsStart + 0.1
        )
      }
    }

    if (socialsBlock) {
      const socialsStart = panelInsertTime + panelDuration * 0.4
      tl.to(socialsBlock, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, socialsStart)
      
      if (userProfileEl) {
        tl.to(userProfileEl, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, socialsStart + 0.3)
      }
    }

    openTlRef.current = tl
    return tl
  }, [])

  const playOpen = useCallback(() => {
    if (busyRef.current) return
    busyRef.current = true
    const tl = buildOpenTimeline()
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false
      })
      tl.play(0)
    } else {
      busyRef.current = false
    }
  }, [buildOpenTimeline])

  const playClose = useCallback(() => {
    openTlRef.current?.kill()
    openTlRef.current = null
    itemEntranceTweenRef.current?.kill()

    const panel = panelRef.current
    const layers = preLayerElsRef.current
    if (!panel) return

    const all: HTMLElement[] = [...layers, panel]
    closeTweenRef.current?.kill()

    const offscreen = position === 'left' ? -100 : 100

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[]
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 })

        const numberEls = Array.from(
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        ) as HTMLElement[]
        if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as string]: 0 })

        const socialsBlock = panel.querySelector('.sm-socials') as HTMLElement | null
        const userProfileEl = panel.querySelector('.sm-user-profile') as HTMLElement | null
        
        if (socialsBlock) gsap.set(socialsBlock, { y: 25, opacity: 0 })
        if (userProfileEl) gsap.set(userProfileEl, { y: 20, opacity: 0 })

        busyRef.current = false
      },
    })
  }, [position])

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current
    const h = plusHRef.current
    const v = plusVRef.current
    if (!icon || !h || !v) return

    spinTweenRef.current?.kill()

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' })
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0)
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0)
    }
  }, [])

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current
      if (!btn) return
      colorTweenRef.current?.kill()
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor
        const targetBg = opening ? openMenuButtonBg : menuButtonBg
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          backgroundColor: targetBg,
          delay: 0.18,
          duration: 0.3,
          ease: 'power2.out',
        })
      } else {
        gsap.set(btn, { color: menuButtonColor, backgroundColor: menuButtonBg })
      }
    },
    [openMenuButtonColor, menuButtonColor, openMenuButtonBg, menuButtonBg, changeMenuColorOnOpen]
  )

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor
        const targetBg = openRef.current ? openMenuButtonBg : menuButtonBg
        gsap.set(toggleBtnRef.current, { color: targetColor, backgroundColor: targetBg })
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor, backgroundColor: menuButtonBg })
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor, menuButtonBg, openMenuButtonBg])

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current
    if (!inner) return

    textCycleAnimRef.current?.kill()

    const currentLabel = opening ? 'Menu' : 'Cerrar'
    const targetLabel = opening ? 'Cerrar' : 'Menu'
    const cycles = 3

    const seq: string[] = [currentLabel]
    let last = currentLabel
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Cerrar' : 'Menu'
      seq.push(last)
    }
    if (last !== targetLabel) seq.push(targetLabel)
    seq.push(targetLabel)

    setTextLines(seq)
    gsap.set(inner, { yPercent: 0 })

    const lineCount = seq.length
    const finalShift = ((lineCount - 1) / lineCount) * 100

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out',
    })
  }, [])

  const toggleMenu = useCallback(() => {
    const target = !openRef.current
    openRef.current = target
    setOpen(target)

    if (target) {
      onMenuOpen?.()
      playOpen()
    } else {
      onMenuClose?.()
      playClose()
    }

    animateIcon(target)
    animateColor(target)
    animateText(target)
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose])

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false
      setOpen(false)
      onMenuClose?.()
      playClose()
      animateIcon(false)
      animateColor(false)
      animateText(false)
      setOpenSubMenus([]) // Reset submenus on close
      setOpenSocials(false)
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose])

  const handleItemClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
      e.preventDefault()
      closeMenu()
      setTimeout(() => {
        router.push(link)
      }, 350)
    },
    [closeMenu, router]
  )

  const toggleSubMenu = useCallback((idx: number) => {
    setOpenSubMenus(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  }, []);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeOnClickAway, open, closeMenu])

  return (
    <div className={`sm-scope ${isFixed ? 'sm-scope--fixed' : 'sm-scope--relative'}`}>
      <div
        className={(className ? className + ' ' : '') + 'staggered-menu-wrapper'}
        style={accentColor ? ({ ['--sm-accent' as string]: accentColor } as React.CSSProperties) : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
          {(() => {
            const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c']
            let arr = [...raw]
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2)
              arr.splice(mid, 1)
            }
            return arr.map((c, i) => (
              <div key={i} className="sm-prelayer" style={{ background: c }} />
            ))
          })()}
        </div>

        <header className="staggered-menu-header" aria-label="Navegación principal">
          <div className="sm-logo" aria-label="Logo">
            {logoUrl && (
              <img
                src={logoUrl}
                alt="logo"
                className="sm-logo-img"
                draggable={false}
                width={110}
                height={24}
              />
            )}
          </div>

          <button
            ref={toggleBtnRef}
            className="sm-toggle"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">
              <span ref={textInnerRef} className="sm-toggle-textInner">
                {textLines.map((l, i) => (
                  <span className="sm-toggle-line" key={i}>
                    {l}
                  </span>
                ))}
              </span>
            </span>

            <span ref={iconRef} className="sm-icon" aria-hidden="true">
              <span ref={plusHRef} className="sm-icon-line" />
              <span ref={plusVRef} className="sm-icon-line" />
            </span>
          </button>
        </header>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel"
          aria-hidden={!open}
          style={{ overflow: 'hidden', paddingRight: '2.5em' }}
        >
          {/* ---- Custom Scrollbar ---- */}
          <div
            className="sm-custom-scrollbar"
            style={{
              opacity: isScrollable ? 1 : 0,
              transform: isScrollable ? 'translateX(0)' : 'translateX(100%)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
            aria-hidden="true"
          >
            {/* Línea central delgada */}
            <div className="sm-scrollbar-track-line" />
            {/* Thumb arrastrable */}
            <div
              ref={thumbRef}
              className="sm-scrollbar-thumb"
              style={{ top: thumbTop, height: thumbHeight }}
              onMouseDown={handleThumbMouseDown}
            />
          </div>

          {/* ---- Scroll Body (invisible scrollbar nativo) ---- */}
          <div
            ref={scrollBodyRef}
            className="sm-panel-scroll-body"
          >
            {panelLogoUrl && (
              <div className="sm-panel-logo">
                <img
                  src={panelLogoUrl}
                  alt="Escuela de Posgrado — UDH"
                  className="sm-panel-logo-img"
                  draggable={false}
                />
              </div>
            )}
            <ul
              className="sm-panel-list"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items && items.length ? (
                items.map((it, idx) => (
                  <li className="sm-panel-itemWrap" key={it.label + idx}>
                    <a
                      className="sm-panel-item sm-panel-item--dynamic"
                      href={it.link}
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                      onClick={(e) => {
                        if (it.subItems && it.subItems.length > 0) {
                          e.preventDefault();
                          toggleSubMenu(idx);
                        } else {
                          handleItemClick(e, it.link);
                        }
                      }}
                    >
                      {it.icon && (
                        <span className="sm-panel-itemIcon">
                          {/* EDITAR AQUI: 'size' modifica el tamaño del ÍCONO de forma independiente */}
                          {React.createElement(it.icon, { size: 20, strokeWidth: 2, className: 'sm-panel-lucide' })}
                        </span>
                      )}
                      <span className="sm-panel-labelMask">
                        <span className="sm-panel-itemLabel">{it.label}</span>
                      </span>
                      {it.subItems && it.subItems.length > 0 && (
                        <span className="sm-panel-chevron" style={{
                          transform: openSubMenus.includes(idx) ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                          display: 'inline-flex',
                          marginLeft: 'auto'
                        }}>
                          <ChevronDown size={24} />
                        </span>
                      )}
                    </a>
                    {it.subItems && it.subItems.length > 0 && (
                      <ul
                        className="sm-panel-sublist"
                        style={{
                          maxHeight: openSubMenus.includes(idx) ? '300px' : '0',
                          opacity: openSubMenus.includes(idx) ? '1' : '0',
                          overflow: 'hidden',
                          transition: 'max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease',
                          paddingLeft: '2.5rem',
                          marginTop: openSubMenus.includes(idx) ? '0.8rem' : '0',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.6rem'
                        }}
                      >
                        {it.subItems.map((sub, sidx) => (
                          <li key={sub.label + sidx}>
                            <a
                              href={sub.link}
                              onClick={(e) => handleItemClick(e, sub.link)}
                              style={{ color: '#ffffff', fontSize: '0.75rem', textDecoration: 'none', opacity: 0.6, transition: 'opacity 0.2s', fontWeight: 500, display: 'block', transform: 'translateY(-2px)' }}
                              onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                              onMouseOut={(e) => e.currentTarget.style.opacity = '0.6'}
                            >
                              {sub.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))
              ) : (
                <li className="sm-panel-itemWrap" aria-hidden="true">
                  <span className="sm-panel-item">
                    <span className="sm-panel-labelMask">
                      <span className="sm-panel-itemLabel">No items</span>
                    </span>
                  </span>
                </li>
              )}
            </ul>

            {displaySocials && socialItems && socialItems.length > 0 && (
              <div className="sm-socials" aria-label="Enlaces de contacto">
                <a
                    className="sm-panel-item sm-panel-item--dynamic"
                    href="#"
                    onClick={(e) => { e.preventDefault(); setOpenSocials(!openSocials); }}
                  >
                    <span className="sm-panel-itemIcon">
                      <Phone size={20} strokeWidth={2} className="sm-panel-lucide" />
                    </span>
                    <span className="sm-panel-labelMask">
                      <span className="sm-panel-itemLabel">Contacto</span>
                    </span>
                    <span className="sm-panel-chevron" style={{
                      transform: openSocials ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      display: 'inline-flex',
                      marginLeft: 'auto'
                    }}>
                      <ChevronDown size={24} />
                    </span>
                </a>
                <ul
                  className="sm-socials-list sm-panel-sublist"
                  role="list"
                  style={{
                      maxHeight: openSocials ? '300px' : '0',
                      opacity: openSocials ? '1' : '0',
                      pointerEvents: openSocials ? 'auto' : 'none',
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease',
                      marginTop: openSocials ? '0.8rem' : '0',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '0.6rem',
                      paddingLeft: '2.5rem'
                  }}
                >
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => handleItemClick(e as any, s.link)}
                        className="sm-socials-link"
                        style={{ color: '#ffffff', fontSize: '0.75rem', textDecoration: 'none', opacity: 0.6, transition: 'opacity 0.2s', fontWeight: 500, display: 'block', transform: 'translateY(-2px)' }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '0.6'}
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div> {/* end sm-panel-scroll-body */}
        </aside>
      </div>
    </div>
  )
}

export default StaggeredMenu
