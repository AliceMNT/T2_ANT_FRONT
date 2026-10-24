import { Component, OnInit, signal } from '@angular/core';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../services/alumno';

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  templateUrl: './alumno-list.html',
  styleUrl: './alumno-list.scss'
})
export class AlumnoList implements OnInit {

  alumnos = signal<Alumno[]>([]);
  cargando = signal(false);
  error = signal('');

  // Angular nos entrega el servicio ya creado (inyección de dependencias)
  constructor(private alumnoService: AlumnoService) {}

  // Se ejecuta al abrir el componente: carga los datos
  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.cargando.set(true);
    this.error.set('');

    this.alumnoService.listar().subscribe({
      next: datos => {
        this.alumnos.set(datos);
        this.cargando.set(false);
      },
      error: err => {
        this.error.set(this.mensajeError(err.status));
        this.cargando.set(false);
      }
    });
  }

  eliminar(id: number | undefined): void {
    if (id === undefined) return;
    if (!confirm('¿Desea eliminar este alumno?')) return;

    this.alumnoService.eliminar(id).subscribe({
      // El backend respondió 204: lo quitamos de la tabla
      next: () => this.alumnos.update(lista => lista.filter(a => a.id !== id)),
      error: err => this.error.set(this.mensajeError(err.status))
    });
  }

  private mensajeError(status: number): string {
    return status === 0
      ? 'No se pudo conectar con el servidor. Verifique que el backend esté en ejecución.'
      : `Error HTTP: ${status}`;
  }
}