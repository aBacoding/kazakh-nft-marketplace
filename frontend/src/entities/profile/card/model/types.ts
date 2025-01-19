export interface IGeneralMenu {
  to: string
  icon: string | React.ReactNode
  title: string
  children?: IGeneralMenu[]
}
