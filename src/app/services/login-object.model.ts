/**
 * Created by xavi on 5/16/17.
 */
export class LoginObject {
  public Usuario: string;
  public Contrasena: string;

  constructor(object: any) {
    this.Usuario = object.Usuario ? object.Usuario : null;
    this.Contrasena = object.Contrasena ? object.Contrasena : null;
  }
}
